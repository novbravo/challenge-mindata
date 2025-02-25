import { TestBed } from "@angular/core/testing";
import { HeroesService } from "./heroes.service";
import { Heroe } from "../intefaces/heroe.inteface";

describe('HeroesService', () => {
  let service: HeroesService;
  const heroe: Heroe = {id: 1, age: 23, fullName: 'Superman', name: 'Clark Kent', power: 'Fuerza'};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesService);
    spyOn(localStorage, 'setItem');
  });

  beforeAll(() => {});
  afterEach(() => {});
  afterAll(() => {});

  it('El servicio debe estar creado', () => {
    expect(service).toBeTruthy();
  });

  it('El servicio devuelve el array de heroes vacío', () => {
    service.heroes.set([]);
    expect(service.heroes()).toEqual([]);
  });

  it('getHeroeById debe devolver el héroe correcto según su ID', () => {
    service.heroes.set([heroe]);
    expect(service.getHeroeById(heroe.id)).toEqual(heroe);
  })

  it('getHeroeById debe devolver undefined si no existe el ID', () => {
    service.heroes.set([heroe]);
    expect(service.getHeroeById(99)).toBeUndefined();
  })

  it('addHeroe debe agregar un héroe', () => {
    service.addHeroe(heroe);
    expect(service.heroes().find(h => h.id === heroe.id)).not.toBeUndefined();
  });

  it('updateHeroe debe actualizar un héroe', () => {
    const heroe2: Heroe = {
      id: 2,
      age: 45,
      fullName: 'Bruno Díaz',
      name: 'Batman',
      power: 'Inteligencia'
    };
    service.heroes.set([heroe, heroe2]);

    const heroeUpdated: Heroe = {
      id: 1,
      age: 23,
      fullName: 'Clark',
      name: 'Superman 2',
      power: 'Fuerza'
    };

    service.updateHeroe(heroeUpdated);
    const heroesListCase1 = service.heroes().find(h => h.id === heroeUpdated.id);
    expect(heroesListCase1).toEqual(heroeUpdated);

    const heroesListCase2 = service.heroes().find(h => h.id === heroe2.id);
    expect(heroesListCase2).toEqual(heroe2);
  })

  it('deleteHeroe debe borrar un héroe', () => {
    service.heroes.set([heroe]);

    service.deleteHeroe(heroe);
    expect(service.heroes().find(h => h.id === heroe.id)).toBeUndefined();
  });
});
