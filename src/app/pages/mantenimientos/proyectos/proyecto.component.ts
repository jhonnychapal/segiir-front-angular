import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { ProyectoService } from '../../../services/proyecto.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styles: [
  ]
})
export class ProyectoComponent implements OnInit {

  public proyectoForm: FormGroup;
  public usuarios: Usuario[];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private proyectoService: ProyectoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.cargarUsuarios();
    this.proyectoForm = this.fb.group({
      nombre: ['Proyecto', Validators.required],
      descripcion: ['Descripción', Validators.required],
      director: ['', Validators.required],
      met: [['60379eb7cf007fdd581b2ec3', '60379eb7cf007fdd581b2ec3'], Validators.required],
    });
  }

  cargarUsuarios(): any{
    this.usuarioService.cargarUsuarios()
        .subscribe((res: any) => {
          console.log(res.usuarios);
          this.usuarios = res.usuarios;
        });
  }

  guardarProyecto(): any{
    const { nombre } = this.proyectoForm.value;
    const proyectoCreado = this.proyectoService.crearProyecto(this.proyectoForm.value)
        .subscribe((resp: any) => {
          console.log(resp);
          Swal.fire('Proyecto creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl('/dashboard/proyectos');
        });
  }

}
