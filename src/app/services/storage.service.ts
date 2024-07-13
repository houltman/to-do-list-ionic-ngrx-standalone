import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../models/task.model';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  private tasks: Task[] = [];

  private localStorage ='tasks-storage';


  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    if (!this._storage) {
      const storage = await this.storage.create();
      this._storage = storage;
    }
    // Cargar tareas
    this.tasks = JSON.parse((await this._storage?.get(this.localStorage)) || '[]');
  }

  // Add tareas
  public async addTask(task: Task) {
    this.tasks.push(task);
    await this._storage?.set(this.localStorage, JSON.stringify(this.tasks));
  }

  // Obtener las tareas
  public async getTasks(): Promise<Task[]> {
    return this.tasks;
  }

  // Actualizar tarea
  public async updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
      await this._storage?.set(this.localStorage, JSON.stringify(this.tasks));
    }
  }

  // Eliminar tarea
  public async deleteTask(taskId?: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    await this._storage?.set(this.localStorage, JSON.stringify(this.tasks));
  }
}



