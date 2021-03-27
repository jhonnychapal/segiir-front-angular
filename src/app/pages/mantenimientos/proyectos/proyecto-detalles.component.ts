import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectoService } from '../../../services/proyecto.service';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario.model';
import { Proyecto } from 'src/app/models/proyecto.model';
import Swal from 'sweetalert2';
import { state } from '@angular/animations';
import { elementAt, map } from 'rxjs/operators';
import { Actividad } from 'src/app/models/actividad.models';
import { Tarea } from 'src/app/models/tarea.model';
import { formatCurrency } from '@angular/common';



@Component({
  selector: 'app-proyecto-detalles',
  templateUrl: './proyecto-detalles.component.html',
  styles: [
  ]
})
export class ProyectoDetallesComponent implements OnInit {

  public proyectoForm: FormGroup;
  public actividadForm: FormGroup;
  public metForm: FormGroup;
  public cargando = true;

  public usuarios: Usuario[];
  public actividadesAux: Actividad[];
  public metAux: Usuario[];
  public nombreAux;
  public directorAux: Usuario;
  public descripcionAux;
  public banderaDirector = false;

  constructor(
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private proyectoService: ProyectoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.proyectoForm = this.fb.group({
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required],
      //director: this.fb.array([]),//['', Validators.required],
      met: this.fb.array([]),
      actividades: this.fb.array([]),
      _id:['', Validators.required]
    });
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarProyecto(id);
    });
  }

  cargarProyecto(id: string): any{
    this.actividadesAux = [];
    this.cargando = true;
    this.proyectoService.obtenerProyectoPorId(id)
        .subscribe((proyecto:Proyecto) => {
          this.cargando = false;
          this.metAux = proyecto.met;
          this.actividadesAux = proyecto.actividades; 
          this.directorAux = proyecto.director;      
          this.proyectoForm.patchValue({
            _id : id,
            nombre: proyecto.nombre,
            descripcion: proyecto.descripcion,
          });
          this.CargarActividades();
          this.CargarMet();
          this.CargarDirector();
          this.ObtenerIdUsuario();
        });
  }

  CargarActividades(){
    for( let i = 0; i < this.actividadesAux.length;i++){
      this.actividadForm = this.fb.group({
            _id: [this.actividadesAux[i]._id, Validators.required],
            nombre: [this.actividadesAux[i].nombre, Validators.required],
            descripcion: [this.actividadesAux[i].descripcion, Validators.required],
            tarea: this.fb.array([])
      });
      for(let j=0;j<this.actividadesAux[i].tarea.length;j++){
        let idtarea = this.actividadesAux[i].tarea[j]._id;
        let normbretarea = this.actividadesAux[i].tarea[j].nombre;
        let realizada = this.actividadesAux[i].tarea[j].realizada;
        const tareaIn = this.fb.group({
          _id:  [idtarea, Validators.required],
          nombre: [normbretarea,Validators.required],
          realizada: [realizada, Validators.required]
        });
        this.tarea.push(tareaIn);
      }
      this.actividades.push(this.actividadForm);
    }  
  }

  CargarMet(){
    for(let i=0; i < this.metAux.length ; i++){
      const met = this.fb.group({
        _id: [this.metAux[i]._id, Validators.required],
        nombre: [this.metAux[i].nombre, Validators.required],
        apellido: [this.metAux[i].apellido, Validators.required]
      })
      this.met.push(met);
    }
  }

  CargarDirector(){
    const director = this.fb.group({
      _id: [this.directorAux._id, Validators.required],
      nombre: [this.directorAux.nombre, Validators.required],
      apellido: [this.directorAux.apellido, Validators.required],
    })
    this.proyectoForm.addControl("director", director)
  }

  ObtenerIdUsuario(){
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    if(usuario.uid == this.directorAux._id){
      this.banderaDirector = true;
    }
  }
    
  get met(): FormArray{
    return this.proyectoForm.get('met') as FormArray;
  }

  get actividades(): FormArray{
    return this.proyectoForm.get('actividades') as FormArray;
  }

  get tarea(): FormArray{
    return this.actividadForm.get('tarea') as FormArray;
  }

  get director(): FormArray{
    return this.proyectoForm.get('director') as FormArray;
  }

  onCheckChange(event) {
    /* Selected */
    if(event.target.checked){
      for(let i=0;i<18;i++){
        const actividad = (<FormArray>this.proyectoForm.get('actividades')).at(i);
        const tareas = <FormArray>actividad.get('tarea');
        for(let j=0;j<tareas.controls.length;j++){
          const modTarea = (<FormArray>actividad.get('tarea')).at(j);
          if(event.target.value== modTarea.value.nombre){
            modTarea.value.realizada = true;
          }
        }
      }
    }
    else{
      for(let i=0;i<18;i++){
        const actividad = (<FormArray>this.proyectoForm.get('actividades')).at(i);
        const tareas = <FormArray>actividad.get('tarea');
        for(let j=0;j<tareas.controls.length;j++){
          const modTarea = (<FormArray>actividad.get('tarea')).at(j);
          if(event.target.value== modTarea.value.nombre){
            modTarea.value.realizada = false;
          }
        }
      }
    }
  }

  guardarProyecto(): any{
    this.cargando = true;
    const proyecto: Proyecto = this.proyectoForm.value;
    const { nombre } = this.proyectoForm.value;
    this.proyectoService.actualizarProyecto(this.proyectoForm.value)
        .subscribe((resp: any) => {
          this.cargando = false;
          Swal.fire('Proyecto Guardado', `${nombre} guardado correctamente`, 'success');
          this.router.navigateByUrl('/dashboard/proyectos');
        });
  }
}
