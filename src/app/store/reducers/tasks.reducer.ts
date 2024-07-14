import { Action, createReducer, on } from '@ngrx/store';
import { cargarTasks, cargarTasksSuccess, addTask, updateTaskDone, deleteTask ,validTask} from '../actions';
import { Task } from '../../models/task.model';

export interface TasksState {
  tasks: Task[],
  loading: boolean,
}

export const tasksInit: TasksState = {
  tasks: [],
  loading: false,
}

export const getTaskLocalStorage: () => TasksState = () => {
  try {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (tasks.length === 0) return tasksInit;
    return tasks;
  } catch (error) {
    return tasksInit;
  }
}

const _tasksReducer = createReducer(getTaskLocalStorage(),

  on(cargarTasks, state => ({ ...state, loading: true })),

  on(cargarTasksSuccess, (state, { tasks }) => ({
    ...state,
    loading: false,
    loaded: true,
    tasks: [...tasks]
  })),

  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),

  on(updateTaskDone, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => {
      if (t.id === task.id) {
        return { ...task };
      } else {
        return t;
      }
    }),
  })),
  on(deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== taskId),
  })),
  //valida si existe una tarea con el mismo nombre
   on(validTask, (state, { task }) => {
     const exists = state.tasks.some((t) => t.name === task.name);
     if (exists) {
       return state;
     }
      return {
        ...state,
        tasks: [...state.tasks, task],
      };
    }),
  

);

export function tasksReducer(state: TasksState, action: Action) {
  return _tasksReducer(state, action);
}