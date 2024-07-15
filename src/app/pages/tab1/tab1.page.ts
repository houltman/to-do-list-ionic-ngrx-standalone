import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonHeader,IonSegment,IonSegmentButton, IonCardHeader,IonCardTitle,IonCardContent,IonCard, ModalController, IonToolbar, IonTitle, IonContent, IonFab,IonButton,IonButtons, IonFabButton, IonIcon, IonItem, IonList, IonToggle, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

// Iconos
import { addIcons } from 'ionicons';
import { create, trash, add , close,alert } from 'ionicons/icons';

// Redux
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { addTask,updateTaskDone ,deleteTask, cargarTasks} from '../../store/actions/tasks.actions';

// Models
import { Task } from '../../models/task.model';

// componentes
//import { ModalController, IonicModule} from '@ionic/angular';
import { ConfirmDeleteTaskComponent } from '../../components/confirm-delete-task/confirm-delete-task.component';
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { NotTasksComponent } from 'src/app/components/not-tasks/not-tasks.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  //imports: [IonicModule,CommonModule] 
  imports: [CommonModule,NotTasksComponent,IonCardHeader,IonSegment,IonSegmentButton,IonCardContent,IonCardTitle,IonCard,AddTaskComponent, IonHeader, IonToolbar, IonTitle, IonContent, IonFab,IonButton,IonButtons, IonFabButton, IonIcon, IonItem, IonList,IonToggle,IonLabel],
})
export class Tab1Page implements OnInit, OnDestroy {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  currentFilter: string = 'all';
  all: string = 'all';
  complete: string = 'complete';
  pending: string = 'pending';
  
  constructor(
    private store: Store<AppState>,
    private modalController: ModalController
  ) { 
    addIcons({ create, trash, add, close ,alert});
  }

  ngOnInit(): void {
    this.store.select('tasks')
      .subscribe(({ tasks }) => {
        if(!tasks) return;
        this.tasks = tasks;
        this.filteredTasks = [...this.tasks]; 
        this.applyFilter();
        // TODO: Probar e Implementar el filtro de tareas en el store
      });
  }

  get mostrarNotTasks(): boolean {
    return this.tasks?.length === 0;
  }

  ngOnDestroy(): void {
    console.log('destroi');
  }

  async add() {
    const modal = await this.modalController.create({
      component: AddTaskComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'redux': true
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if(data.add) {

      const task: Task = {
        id: Date.now(),
        name: data.form.name,
        done: data.form.done,
        created_at: data.form.created_at,
      }
      this.store.dispatch(addTask({ task }));
    }

  }

  updateTaskDone(task: Task) {
    // Cambia el estado de 'done' de la tarea seleccionada
    const updatedTask = { ...task, done: !task.done };
  
    // Despacha una acción para actualizar la tarea en el store
    this.store.dispatch(updateTaskDone({ task: updatedTask }));
  }

  async deleteTask(task: Task) {
    const modal = await this.modalController.create({
      component: ConfirmDeleteTaskComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        task: task.name
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data.confirmed) {

      this.store.dispatch(deleteTask({ taskId: task.id}));
    }
  }

  filterTasks(event: any) {
    this.currentFilter = event.detail.value;
    this.applyFilter();
  }

  applyFilter() {
    if (this.currentFilter === this.all) {
      this.filteredTasks = [...this.tasks];
    } else if (this.currentFilter === this.complete) {
      this.filteredTasks = this.tasks.filter(task => task.done);
    } else if (this.currentFilter === this.pending) {
      this.filteredTasks = this.tasks.filter(task => !task.done);
    }
  }

}

