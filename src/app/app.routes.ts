import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'heroes',
    loadComponent: () => import('./heroes/components/heroes/heroes.component')
  },
  {
    path: 'heroe/:id/:action',
    loadComponent: () => import('./heroes/components/heroe/heroe.component')
  },
  {
    path: '**',
    redirectTo: 'heroes'
  }
];
