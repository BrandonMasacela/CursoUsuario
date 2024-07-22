import { Curso } from './../model/curso.interface';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CursoService } from '../services/curso.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [
    RouterModule, RouterLink, MatIconModule,
    MatButtonModule, MatDividerModule,
    MatTableModule, MatPaginatorModule
  ],
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export default class CursoListComponent implements OnInit {
  private cursoService = inject(CursoService);

  displayedColumns: string[] = ['id', 'nombre', 'operaciones'];
  dataSource = new MatTableDataSource<Curso>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.cursoService.list().subscribe(cursos => {
      this.dataSource.data = cursos;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCurso(curso: Curso) {
    this.cursoService.delete(curso.id).subscribe(() => {
      this.loadAll();
      console.log('Curso eliminado');
    });
  }
}
