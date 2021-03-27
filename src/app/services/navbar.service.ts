import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public menu = [];

  cargarMenu(){
    this.menu= JSON.parse(localStorage.getItem('menu')) || [];
  }

  // menu: any[] = [
  //   {
  //     titulo: 'Proyectos',
  //     // icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Todos los poyectos', url: 'proyectos' },
  //       { titulo: 'Nuevo proyecto', url: 'proyecto-nuevo' },
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     // icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Proyectos', url: 'proyectos' },
  //     ]
  //   }
  // ];

  // constructor() { }
}
