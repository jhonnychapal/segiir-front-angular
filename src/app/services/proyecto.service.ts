import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../models/proyecto.model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  constructor(
    private http: HttpClient
  ) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }


  get headers(): any{
    return {
      headers: {
        // tslint:disable-next-line: object-literal-key-quotes
        'xtoken': this.token
      }
    };
  }

  cargarProyectos(): any{
    const url = `${ base_url }/proyectos`;
    return this.http.get(url, this.headers)
        .pipe(
           // map( (resp: {ok: boolean, proyectos: Proyecto[] }) => resp.proyectos )
           map( (resp: any) => resp.proyectos )
        );
  }

  obtenerProyectoPorId(id: string): any{
    const url = `${ base_url }/proyectos/${id}`;
    return this.http.get(url, this.headers)
        .pipe(
           // map( (resp: {ok: boolean, proyectos: Proyecto[] }) => resp.proyectos )
           map( (resp: any) => resp.proyecto )
        );
  }

  crearProyecto( proyecto: { nombre: string, descripcion: string, director: string, met: string }): any{
    const url = `${ base_url }/proyectos`;
    return this.http.post(url, proyecto, this.headers);
  }

  actualizarProyecto(proyecto: Proyecto): any{
    const url = `${ base_url }/proyectos/${ proyecto._id}`;
    return this.http.put(url, proyecto, this.headers );
  }

  // tslint:disable-next-line: variable-name
  borrarProyecto( _id: string): any{
    const url = `${ base_url }/proyectos/${ _id}`;
    return this.http.delete(url, this.headers );
  }
}
