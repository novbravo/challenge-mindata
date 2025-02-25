import { Component, inject, output, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { FormUtils } from '../../../utils/form-utils';
import { Heroe } from '../../intefaces/heroe.inteface';
import { HeroesService } from '../../services/heroes.service';
import { UppercaseTextDirective } from '../../../shared/directives/uppercase-text.directive';

@Component({
  selector: 'app-heroe',
  imports: [RouterLink, MatButtonModule, MatIconModule, MatInputModule, MatGridListModule, ReactiveFormsModule, MatExpansionModule,
    MatFormFieldModule, MatListModule, MatCardModule, UppercaseTextDirective],
  templateUrl: './heroe.component.html',
  styleUrl: './heroe.component.css'
})
export class HeroeComponent {
  typeOfPowers: string[] = ['Inteligencia', 'Velocidad', 'Fuerza', 'Volar'];

  private router = inject(Router)
  private fb = inject(FormBuilder);

  heroesService = inject(HeroesService);

  heroeId: number = Number(inject(ActivatedRoute).snapshot.params['id']);
  action: string = inject(ActivatedRoute).snapshot.params['action'];
  actionText = signal<string>('');
  newHeroe = output<Heroe>();

  formUtils = FormUtils;

  heroeForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    age: [0, [Validators.required]],
    fullName: ['', [Validators.required]],
    power: ['']
  });

  constructor() {
    if (!isNaN(this.heroeId)) {
      let heroe = this.heroesService.getHeroeById(this.heroeId);

      this.heroeForm.controls['name'].setValue(heroe?.name);
      this.heroeForm.controls['age'].setValue(heroe?.age);
      this.heroeForm.controls['fullName'].setValue(heroe?.fullName);
      this.heroeForm.controls['power'].setValue(heroe?.power);

      this.actionText.set(this.action === 'read' ? 'Ver' : this.action === 'edit' ? 'Editar' : 'Nuevo');
      if (this.action === 'read') this.heroeForm.disable();
    }

  }

  saveHeroe() {
    if (this.heroeForm.invalid) return;

    if (this.heroeId === 0) {
      const newHeroe: Heroe = this.createHeroeObject(Math.floor(Math.random() * 1000));
      this.heroesService.addHeroe(newHeroe);
    } else {
      const newHeroe: Heroe = this.createHeroeObject(this.heroeId);
      this.heroesService.updateHeroe(newHeroe);
    }

    this.router.navigateByUrl('/heroes');
  }

  createHeroeObject(id: number): Heroe {
    return { id, ...this.heroeForm.value };
  }
}
