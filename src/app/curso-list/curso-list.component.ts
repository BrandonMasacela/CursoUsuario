import { Curso } from './../model/curso.interface';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CursoService } from '../services/curso.service';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  standalone: true,
  imports: [RouterModule, RouterLink],
  styleUrls: ['./curso-list.component.css']
})
export default class CursoListComponent implements OnInit {

  private cursoService = inject(CursoService);
  cursos1: Curso[] = [];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.cursoService.list().subscribe(cursos => {
      this.cursos1 = cursos;
    });
  }

  deleteCurso(curso: Curso) {
    this.cursoService.delete(curso.id).subscribe(() => {
      this.loadAll();
      console.log('Curso eliminado');
    });
  }

}
