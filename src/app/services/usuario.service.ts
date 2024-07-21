import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../model/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient);

  list() {
    return this.http.get<Usuario[]>('http://localhost:8001/usuario/MostrarUsuarios');
  }

  get(id: number) {
    return this.http.get<Usuario>(`http://localhost:8001/usuario/BuscarUsuarioPorID/${id}`);
  }

  create(usuario : Usuario) {
    return this.http.post<Usuario>('http://localhost:8001/usuario/CrearUsuario', usuario);
  }

  update(id: number, usuario: Usuario) {
    return this.http.put<Usuario>(`http://localhost:8001/usuario/ModificarUsuario/${id}`, usuario);
  }

  delete(id: number) {
    return this.http.delete<void>(`http://localhost:8001/usuario/EliminarUsuario/${id}`);
  }

}
