import { effect, Injectable, signal } from '@angular/core';
import { Heroe } from '../intefaces/heroe.inteface';



@Injectable({providedIn: 'root'})
export class HeroesService {
  loadFromLocalStorage = (): Heroe[] => {
    const heroes = localStorage.getItem('heroes');
    return heroes ? JSON.parse(heroes) : [];
  }

  heroes = signal<Heroe[]>(this.loadFromLocalStorage());

  saveToLocalStorage = effect(() => {
    localStorage.setItem('heroes', JSON.stringify(this.heroes()));
  })

  getHeroeById(id: number): Heroe | undefined {
    return this.heroes().find(heroe => heroe.id === id);
  }

  addHeroe(heroe: Heroe) {
    this.heroes.update((heroesList) => [...heroesList, heroe]);
  }

  updateHeroe(heroe: Heroe) {
    this.heroes.update((heroesList) =>
      heroesList.map(h => h.id === heroe.id ? heroe : h)
    );
  }

  deleteHeroe(heroe: Heroe) {
    this.heroes.update((heroesList: Heroe[]) =>
        heroesList.filter(h => h.id !== heroe.id)
  )}
}

