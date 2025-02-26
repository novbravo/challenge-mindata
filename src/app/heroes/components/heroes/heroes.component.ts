import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, inject, input, signal, ViewChild } from '@angular/core';
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
    MatDialogModule, MatProgressSpinnerModule, RouterLink, MatPaginatorModule, MatCardModule, MatDividerModule
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export default class HeroesComponent implements AfterViewInit {
  heroesService = inject(HeroesService);
  heroeSelected?: Heroe;
  dialog = inject(MatDialog);

  readonly displayedColumns: string[] = ['id', 'name', 'fullName', 'age', 'power', 'actions'];

  dataSource = new MatTableDataSource<Heroe>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource.data = this.heroesService.heroes();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }

  filterName = signal<string>('');

  filterBy(query: Event) {
    this.filterName.set((query.target as HTMLInputElement).value);
  }

  heroes = computed(() =>
    this.heroesService.heroes().filter(h =>
      h.name.toLowerCase().includes(this.filterName().toLowerCase())
    )
  );

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
