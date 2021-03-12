import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../Interfaces/register-form.interface';
import { LoginForm } from '../Interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../Interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  get headers(): any{
    return {
      headers: {
        'xtoken': this.token
      }
    }
  }

  logout(): void{
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean>{
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'xtoken': this.token
      }
    }).pipe(
      map((resp: any) => {
        console.log(resp);
        const { nombre, apellido, email, estado, admin, uid } = resp.usuario;
        this.usuario = new Usuario( nombre, apellido, email, estado, admin, '', uid );
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false) )
    );
  }

  crearUsuario( formData: RegisterForm ): any{
    return this.http.post(`${ base_url }/usuarios`, formData)
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  actualizarPerfil(data: {nombre: string, apellido: string, email: string, admin: boolean, estado: boolean}): any{

    data = {
      ...data,
      admin: this.usuario.admin,
      estado: this.usuario.estado
    };
    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers);

  }

  login( formData: LoginForm ): any{
    return this.http.post(`${ base_url }/login`, formData)
        .pipe(
          tap( (resp: any) => {
            localStorage.setItem('token', resp.token);
          })
        );
  }

  cargarUsuarios(desde: number = 0): any{
    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>(url, this.headers);
  }

  cargarUsuariosList():any{
    const url= `${ base_url }/usuarios/list`
    return this.http.get<CargarUsuario>(url, this.headers);
  }

  eliminarUsuario(usuario: Usuario): any{
    const url = `${ base_url }/usuarios/${ usuario.uid }`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario): any{

    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers);

  }

}
