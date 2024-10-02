import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    IonHeader,
    IonSegment,
    IonSegmentButton,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCard,
    ModalController,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonButton,
    IonButtons,
    IonFabButton,
    IonIcon,
    IonItem,
    IonList,
    IonToggle,
    IonLabel,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';

// Iconos
import { addIcons } from 'ionicons';
import { create, trash, add, close, alert } from 'ionicons/icons';

// Redux
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import {
    addTask,
    updateTaskDone,
    deleteTask,
    cargarTasks,
    cargarTasksSuccess,
} from '../../store/actions/tasks.actions';

// Models
import { Task } from '../../models/task.model';

// componentes
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { NotTasksComponent } from 'src/app/components/not-tasks/not-tasks.component';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/tasks.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    standalone: true,
    //imports: [IonicModule,CommonModule]
    imports: [
        CommonModule,
        NotTasksComponent,
        IonCardHeader,
        IonSegment,
        IonSegmentButton,
        IonCardContent,
        IonCardTitle,
        IonCard,
        AddTaskComponent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonFab,
        IonButton,
        IonButtons,
        IonFabButton,
        IonIcon,
        IonItem,
        IonList,
        IonToggle,
        IonLabel,
    ],
})
export class Tab1Page implements OnInit, OnDestroy {
    tasks: Task[] = [];
    filteredTasks: Task[] = [];
    currentFilter: string = 'all';
    all: string = 'all';
    complete: string = 'complete';
    pending: string = 'pending';
    //tasks$?: Observable<Task[]>;
    constructor(
        private store: Store<AppState>,
        private modalController: ModalController,
        private alertController: AlertController,
        private taskService: TaskService
    ) {
        addIcons({ create, trash, add, close, alert });
        //this.tasks$ = this.store.select('tasks');
    }

    ngOnInit(): void {
        this.store.select('tasks').subscribe(({ tasks }) => {
            if (!tasks) return;
            this.tasks = tasks;
            this.filteredTasks = [...this.tasks];
            this.applyFilter();
            // TODO: Probar e Implementar el filtro de tareas en el store
        });
    }

    ionViewWillEnter() {
        this.taskService.getTasks().subscribe(tasks => {
            this.store.dispatch(cargarTasksSuccess({ tasks }));
        });
    }

    get mostrarNotTasks(): boolean {
        //return false;
        return this.tasks?.length === 0;
    }

    ngOnDestroy(): void {
        console.log('destroi');
    }

    async add() {
        const alert = await this.alertController.create({
            header: 'Ingrese el nombre de la tarea',
            inputs: [
                {
                    name: 'task',
                    type: 'text',
                    placeholder: 'Task',
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Cancelado');
                    },
                },
                {
                    text: 'Aceptar',
                    handler: (data) => {
                        // Validar que los campos no estén vacíos
                        if (!data.task) {
                            this.alertController
                                .create({
                                    header: 'Error',
                                    message:
                                        'Por favor, complete el nombre de la tarea.',
                                    buttons: ['OK'],
                                })
                                .then((alert) => alert.present());
                            return false; // No cerrar el alert principal
                        }

                        //console.log('Datos ingresados:', data);
                        this.createTask(data);
                        return true;
                    },
                },
            ],
        });

        await alert.present();
    }

    createTask(data: any) {
        const task: Task = {
            name: data.task,
        };
        // Enviar la tarea
        this.taskService.addTask(task).subscribe((saveTask) => {
            this.store.dispatch(addTask({ task: saveTask }));
        });
    }

    updateTaskDone(task: Task) {
        // Cambia el estado de 'done' de la tarea seleccionada
        //const updatedTask = { ...task, done: !task.done };

        const { name, done, _id } = task;
        const updatedTask = { name, done: !done };

        this.taskService.updateTask(updatedTask,_id).subscribe((task) => {
            // Despacha una acción para actualizar la tarea en el store
            this.store.dispatch(updateTaskDone({ task }));
        });
    }

    async deleteTask(task: Task) {
        const alert = await this.alertController.create({
            header: 'Confirmar',
            message: '¿Estás seguro de que deseas Eliminar la Tarea?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Cancelado');
                    },
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.taskService.deleteTask(task).subscribe(()=>{
                            this.store.dispatch(deleteTask({ taskId: task._id }));
                        })
                       
                    },
                },
            ],
        });

        await alert.present();
    }

    filterTasks(event: any) {
        this.currentFilter = event.detail.value;
        this.applyFilter();
    }

    applyFilter() {
        if (this.currentFilter === this.all) {
            this.filteredTasks = [...this.tasks];
        } else if (this.currentFilter === this.complete) {
            this.filteredTasks = this.tasks.filter((task) => task.done);
        } else if (this.currentFilter === this.pending) {
            this.filteredTasks = this.tasks.filter((task) => !task.done);
        }
    }

}
