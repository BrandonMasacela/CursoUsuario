import { Usuario } from './../model/usuario.interface';
import { RouterLink, RouterModule } from '@angular/router';
import { UsuarioService } from './../services/usuario.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export default class UsuarioListComponent implements OnInit {
  private usuarioService = inject(UsuarioService);

  usuarios1: Usuario[] = [];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.usuarioService.list().subscribe(usuarios => {
      this.usuarios1 = usuarios;
    });
  }

  delete(Usuario: Usuario) {
    this.usuarioService.delete(Usuario.id).subscribe(() => {
      this.loadAll();
      console.log('Usuario eliminado');
    });
  }
}
