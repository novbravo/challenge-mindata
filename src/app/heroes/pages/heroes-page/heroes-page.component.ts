import { Component, inject } from '@angular/core';
import { HeroeComponent } from '../../components/heroe/heroe.component';
import { HeroesComponent } from "../../components/heroes/heroes.component";
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-page',
  imports: [HeroeComponent, HeroesComponent],
  templateUrl: './heroes-page.component.html'
})
export class HeroesPageComponent {
  public heroesService = inject(HeroesService);
  router = inject(Router);


}
