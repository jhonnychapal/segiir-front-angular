import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
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
  public met: FormControl;
  public usuarios: Usuario[];
  public cargando = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private proyectoService: ProyectoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.cargarUsuarios();
    this.proyectoForm = new FormGroup({ 
    });
    this.proyectoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      director: ['', Validators.required],
      met: new FormArray([], Validators.required),
      //met: [[], Validators.required],
    });
   }

  cargarUsuarios(): any{
    this.usuarioService.cargarUsuariosList()
        .subscribe((res: any) => {
          this.usuarios = res.usuarios;
        });
        
  }

  guardarProyecto(): any{
    this.cargando= true;
    const { nombre } = this.proyectoForm.value;
    const proyectoCreado = this.proyectoService.crearProyecto(this.proyectoForm.value)
        .subscribe((resp: any) => {
          this.cargando = false;
          Swal.fire('Proyecto creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl('/dashboard/proyectos');
        });
  }

  onCheckChange(event) {
    const formArray: FormArray = this.proyectoForm.get('met') as FormArray;
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }
}
