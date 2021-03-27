import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {

  menuItems: any[];
  public usuario: Usuario;

  constructor(
    public navbarService: NavbarService,
    private usuarioService: UsuarioService
  ) {
    //this.menuItems = navbarService.menu;
    this.usuario = usuarioService.usuario;
  }

  logout(): void{
    this.usuarioService.logout();
  }

}
