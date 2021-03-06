import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectoService } from '../../../services/proyecto.service';
import { FormGroup } from '@angular/forms';
import { Usuario } from '../../../models/usuario.model';
import { Proyecto } from 'src/app/models/proyecto.model';

@Component({
  selector: 'app-proyecto-detalles',
  templateUrl: './proyecto-detalles.component.html',
  styles: [
  ]
})
export class ProyectoDetallesComponent implements OnInit {

  public proyectoForm: FormGroup;
  public usuarios: Usuario[];
  public proyectoSeleccionado: Proyecto[];

  constructor(
    private proyectoService: ProyectoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarProyecto(id);
    });
  }

  cargarProyecto(id: string): any{
    this.proyectoService.obtenerProyectoPorId(id)
        .subscribe( proyecto => {
          const { nombre, descripcion, director, met, actividades } = proyecto;
          // const { nombre, descripcion, actividades:{_id}} = proyecto;
          console.log(nombre, descripcion, director, met, actividades);
          this.proyectoForm = proyecto;
        });
  }

}
