import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(
    private http: HttpClient
  ) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(): any{
    return {
      headers: {
        'xtoken': this.token
      }
    };
  }

  buscar(
    tipo: 'usuarios' | 'proyectos',
    termino: string
    ): any{
    const url = `${ base_url }/todo/coleccion/${ tipo }/${termino}`;
    return this.http.get<any[]>(url, this.headers)
        .pipe(
          map((resp: any) => resp.resultados )
        );
  }
}
