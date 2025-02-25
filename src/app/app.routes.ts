import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/components/heroes/heroes.component';
import { HeroeComponent } from './heroes/components/heroe/heroe.component';

export const routes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'heroe/:id/:action',
    component: HeroeComponent
  },
  {
    path: '**',
    redirectTo: 'heroes'
  }
];
