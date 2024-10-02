import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    //private apiUrl = 'http://localhost:3000/api/v1/tasks';
    // Agregar en variable de entorno
    private apiUrl = 'https://vercel-demo-one-plum.vercel.app/api/v1/tasks';

    constructor(private http: HttpClient) { }

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
    }

    addTask(task: Task): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, task);
    }

    updateTask(task: Task, idTask: any): Observable<Task> {
        return this.http.patch<Task>(`${this.apiUrl}/${idTask}`, task);
    }

    deleteTask(task: Task): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${task._id}`);
    }
}
