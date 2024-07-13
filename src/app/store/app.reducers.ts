import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as reducers from './reducers';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
export interface AppState {
   tasks: reducers.TasksState,
}

export const appReducers: ActionReducerMap<AppState> = {
   tasks: localStorageSyncReducer(reducers.tasksReducer),
}

export function localStorageSyncReducer(reducer: any): any {
   return localStorageSync({ keys: ['tasks'] })(reducer);
}

export const persistedAppReducers: ActionReducerMap<AppState> = {
   tasks: localStorageSyncReducer(reducers.tasksReducer),
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [localStorageSyncReducer] : [];
