import { Routes } from '@angular/router';
import path from 'path';

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
  {
    path: 'mostrarCursos',
    loadComponent: () => import('./curso-list/curso-list.component')
  },
  {
    path: 'nuevoCurso',
    loadComponent: () => import('./curso-form/curso-form.component')
  },
  {
    path: 'mostrarCursos/:id/editar',
    loadComponent: () => import('./curso-form/curso-form.component')
  },
  {
    path: ':id/mostrarCursos',
    loadComponent: () => import('./curso-list/curso-list.component')
  },
  {
    path: 'mostrarInscripciones',
    loadComponent: () => import('./curso-usuario/curso-usuario.component')
  },
];
