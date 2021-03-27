import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../../services/proyecto.service';
import { Proyecto } from '../../../models/proyecto.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styles: [
  ]
})
export class ProyectosComponent implements OnInit {

  public proyectos: Proyecto[] = [];
  public proyectosTemp: Proyecto[] = [];
  public cargando = true;
  public banderaAdmin = false;

  constructor(
    private proyectoService: ProyectoService,
    private busquedasService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): any{
    this.cargando = true;
    this.proyectoService.cargarProyectos()
      .subscribe( proyectos => {
        this.cargando = false;
        this.proyectos = proyectos;
        this.proyectosTemp = proyectos;
      });
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    this.banderaAdmin = usuario.admin;
  }

  buscar(termino: string): any {
    if (termino.length < 1){
      return this.proyectos = this.proyectosTemp;
    }

    this.busquedasService.buscar('proyectos', termino)
       .subscribe(resultados => {
         this.proyectos = resultados;

       });
  }

  borrarProyecto(proyecto: Proyecto): any{

    Swal.fire({
      title: '¿Borrar proyecto?',
      text: `Está a punto de eliminar a ${proyecto.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.proyectoService.borrarProyecto(proyecto._id)
            .subscribe( resp => {
              this.cargarProyectos();
              Swal.fire(
                'Proyecto eliminado',
                `${proyecto.nombre} fue eliminado correctamente`,
                'success'
              );
            });
      }
    });
  }

}
