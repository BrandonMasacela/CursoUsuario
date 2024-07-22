import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Curso1 } from '../model/curso-usuario.interface';
import { CursoUsuarioService } from '../services/curso-usuario.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../model/usuario.interface';
import { catchError, forkJoin, of } from 'rxjs';
import { Curso } from '../model/curso.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AsignarUsuarioDialogComponent } from '../asignar-usuario-dialog/asignar-usuario-dialog.component';


@Component({
  selector: 'app-curso-usuario',
  templateUrl: './curso-usuario.component.html',
  standalone: true,
  imports: [RouterModule, RouterLink, MatIconModule,
    MatButtonModule, MatDividerModule,
    MatTableModule, MatPaginatorModule],
  styleUrls: ['./curso-usuario.component.css']
})
export default class CursoUsuarioComponent implements OnInit {

  private cursoService = inject(CursoUsuarioService);
  cursos1: Curso[] = [];
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);
  usuariosMap: Map<number, Usuario> = new Map();
  private dialog = inject(MatDialog);
  displayedColumns: string[] = ['usuarioId', 'nombre', 'correo'];

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
    //console.log(`Buscando nombre para ID ${usuarioId}: ${usuario ? usuario.nombre : 'Nombre no disponible'}`); // Depuración
    return usuario?.nombre ?? 'Nombre no disponible';
  }

  getUsuarioCorreo(usuarioId: number): string {
    const usuario = this.usuariosMap.get(usuarioId);
    return usuario?.email ?? 'Correo no disponible';
  }

  openAsignarUsuarioDialog(cursoId: number, nombreCurso: string) {
    const dialogRef = this.dialog.open(AsignarUsuarioDialogComponent, {
      width: '400px',
      data: {
        cursoId: cursoId,
        nombreCurso: nombreCurso  // Pasa el nombre del curso aquí
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Obtén la información completa del usuario
        this.usuarioService.get(result.usuarioId).subscribe(usuario => {
          const usuarioCompleto: Usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password // Asegúrate de no exponer la contraseña si es sensible
          };

          // Asigna el usuario al curso
          this.cursoService.asignarUsuario(cursoId, usuarioCompleto).subscribe(() => {
            // Recarga los datos para mostrar la información actualizada
            this.ngOnInit();
          }, error => {
            console.error('Error al asignar usuario al curso:', error);
            this.ngOnInit();
          });
        }, error => {
          console.error('Error al obtener información del usuario:', error);
        });
        this.ngOnInit();
      }
    });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
