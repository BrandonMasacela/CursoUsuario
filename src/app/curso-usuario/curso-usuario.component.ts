import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Curso1 } from '../model/curso-usuario.interface';
import { CursoUsuarioService } from '../services/curso-usuario.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../model/usuario.interface';
import { catchError, forkJoin, of } from 'rxjs';
import { Curso } from '../model/curso.interface';


@Component({
  selector: 'app-curso-usuario',
  templateUrl: './curso-usuario.component.html',
  standalone: true,
  imports: [RouterModule, RouterLink],
  styleUrls: ['./curso-usuario.component.css']
})
export default class CursoUsuarioComponent implements OnInit {

  private cursoService = inject(CursoUsuarioService);
  cursos1: Curso[] = [];
  private usuarioService = inject(UsuarioService);
  usuariosMap: Map<number, Usuario> = new Map();

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.cursoService.list().subscribe(cursos => {
      this.cursos1 = cursos;
      this.loadUsuarios();
    });
  }

  loadUsuarios() {
    const usuariosObservables = [];

    for (let curso of this.cursos1) {
      for (let cursoUsuario of curso.cursoUsuarios) {
        if (!this.usuariosMap.has(cursoUsuario.usuarioId)) {
          usuariosObservables.push(
            this.usuarioService.get(cursoUsuario.usuarioId).pipe(
              catchError(error => {
                console.error(`Error al cargar usuario con ID ${cursoUsuario.usuarioId}:`, error);
                return of(null);
              })
            )
          );
        }
      }
    }

    forkJoin(usuariosObservables).subscribe(usuarios => {
      for (let usuario of usuarios) {
        if (usuario) {
          this.usuariosMap.set(usuario.id, usuario);
        }
      }
      console.log(this.usuariosMap); // Depuración: Verifica el contenido del mapa de usuarios
    });
  }

  getUsuarioNombre(usuarioId: number): string {
    const usuario = this.usuariosMap.get(usuarioId);
    console.log(`Buscando nombre para ID ${usuarioId}: ${usuario ? usuario.nombre : 'Nombre no disponible'}`); // Depuración
    return usuario?.nombre ?? 'Nombre no disponible';
  }

  getUsuarioCorreo(usuarioId: number): string {
    const usuario = this.usuariosMap.get(usuarioId);
    return usuario?.email ?? 'Correo no disponible';
  }

}
