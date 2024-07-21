import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from '../model/curso.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoUsuarioService {

  private http = inject(HttpClient);

  list(): Observable<Curso[]> {
    return this.http.get<Curso[]>('http://localhost:8002/curso/MostrarCursos');
  }

}
