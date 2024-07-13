import { Component, OnInit } from '@angular/core';
import { IonHeader, ModalController, IonToolbar, IonTitle, IonContent, IonFab,IonButton,IonButtons, IonFabButton, IonIcon, IonItem, IonList, IonToggle, IonLabel } from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

// Storage
import { StorageService } from '../../services/storage.service';

// Iconos
import { addIcons } from 'ionicons';
import { create, trash, add, close, alert } from 'ionicons/icons';

// Componentes
import { ConfirmDeleteTaskComponent } from '../../components/confirm-delete-task/confirm-delete-task.component';
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { NotTasksComponent } from 'src/app/components/not-tasks/not-tasks.component';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true, // To Do: importar los componentes de Ionic en un modulo
  imports: [CommonModule,NotTasksComponent, IonHeader, IonToolbar, IonTitle, IonContent, IonFab,IonButton,IonButtons, IonFabButton, IonIcon, IonItem, IonList,IonToggle,IonLabel],
})
export class Tab2Page implements OnInit {

  tasks: Task[] = [];

  constructor(
    private modalController: ModalController,
    private storageService: StorageService
  ) {
    addIcons({ create, trash, add, close, alert });
  }

  async ngOnInit() {
    await this.storageService.init(); 
    this.tasks = await this.storageService.getTasks();
  }

  async getTasks() {
    this.tasks = await this.storageService.getTasks();
  }

  async add() {
    const modal = await this.modalController.create({
      component: AddTaskComponent,
      cssClass: 'my-custom-class'
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data.add) {

      const task: Task = {
        id: Date.now(),
        name: data.form.name,
        done: data.form.done,
        created_at: data.form.created_at,
      }
      await this.storageService.addTask(task);
      await this.getTasks();
    }


  }

 async  updateTaskDone(task: Task) {
    const updatedTask = { ...task, done: !task.done };
    this.storageService.updateTask(updatedTask);
    await this.getTasks();

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
      this.storageService.deleteTask(task.id);
      await this.getTasks();

    }
  }

}
