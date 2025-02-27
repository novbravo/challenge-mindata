import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, DestroyRef, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { HeroesService } from '../../services/heroes.service';

import { Heroe } from '../../intefaces/heroe.inteface';
import { ModalDialogComponent } from '../../../shared/components/modal-dialog/modal-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-heroes',
  imports: [MatChipsModule, CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    MatPaginatorModule, MatDialogModule, MatProgressSpinnerModule, RouterLink, MatCardModule, MatDividerModule
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export default class HeroesComponent implements AfterViewInit, OnInit {
  heroesService = inject(HeroesService);
  dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  readonly displayedColumns: string[] = ['id', 'name', 'fullName', 'age', 'power', 'actions'];

  dataSource = new MatTableDataSource<Heroe>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterName = signal<string>('');

  heroes = computed(() =>
    this.heroesService.heroes().filter(h =>
      h.name.toLowerCase().includes(this.filterName().toLowerCase())
    )
  );

  constructor() {
    const dataEffect = effect(() => {
      this.dataSource.data = this.heroes();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
    this.destroyRef.onDestroy(() => dataEffect.destroy());
  }

  ngOnInit() {
    this.dataSource.data = this.heroesService.heroes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página'
  }

  filterBy(query: Event) {
    const filterValue = (query.target as HTMLInputElement).value;
    this.filterName.set(filterValue.trim().toLowerCase());
  }

  onDelete(heroe: Heroe) {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      width: '300px',
      data: { name: heroe.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroesService.deleteHeroe(heroe);
      }
    });
  }
}
