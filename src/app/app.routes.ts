import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home-page/home-page.component')
  },
  {
    path: 'mostrarUsuarios',
    loadComponent: () => import('./usuario-list/usuario-list.component')
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./usuario-form/usuario-form.component')
  },
  {
    path: 'mostrarUsuarios/:id/editar',
    loadComponent: () => import('./usuario-form/usuario-form.component')
  },
  {
    path: ':id/mostrarUsuario',
    loadComponent: () => import('./usuario-list/usuario-list.component')
  },
];
