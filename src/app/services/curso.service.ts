import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Curso } from '../model/curso.interface';
import { Usuario } from '../model/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private http = inject(HttpClient);

  list() {
    return this.http.get<Curso[]>('http://localhost:8002/curso/MostrarCursos');
  }

  get(id: number) {
    return this.http.get<Curso>(`http://localhost:8002/curso/BuscarCursoPorID/${id}`);
  }

  create(curso : Curso) {
    return this.http.post<Curso>('http://localhost:8002/curso/CrearCurso', curso);
  }

  update(id: number, curso: Curso) {
    return this.http.put<Curso>(`http://localhost:8002/curso/ModificarCurso/${id}`, curso);
  }

  delete(id: number) {
    return this.http.delete<void>(`http://localhost:8002/curso/EliminarCurso/${id}`);
  }

  asignarUsuario(idcurso: number, usuario: Usuario) {
    return this.http.put(`http://localhost:8002/asignar-usuario/${idcurso}`, usuario);
  }
}
