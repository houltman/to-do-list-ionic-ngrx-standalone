import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '**', // Ruta de comodín para capturar todas las rutas no definidas
    redirectTo: '/redux', // Redirecciona a /redux
    pathMatch: 'full' // Asegura que toda la URL debe coincidir
  }

];
