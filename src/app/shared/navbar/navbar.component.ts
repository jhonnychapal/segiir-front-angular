import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {

  public usuario: Usuario;

  constructor(
    private usuarioService: UsuarioService
  ) {
    this.usuario = usuarioService.usuario;
  }

  logout(): void{
    this.usuarioService.logout();
  }

}
