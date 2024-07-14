import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

// Cargar las tareas
export const cargarTasks = createAction('[Tasks] Cargar Tasks');

// Cargar las tareas
export const cargarTasksSuccess = createAction(
    '[Tasks] Cargar Tasks Success',
    props<{ tasks: Task[] }>()
);

// Agregar una tarea
export const addTask = createAction(
    '[Tasks] Agregar Task',
    props<{ task: Task }>()
);

// Actualizar la tarea
export const updateTaskDone = createAction(
    '[Tasks] Actualizar Task',
    props<{ task: Task }>()
);

// Eliminar la tarea
export const deleteTask = createAction(
    '[Tasks] Eliminar Task',
    props<{ taskId?: number }>()
);

// validar si existe una tarea con el mismo nombre
export const validTask = createAction(
    '[Tasks] Validar Task',
    props<{ task: Task }>()
);
