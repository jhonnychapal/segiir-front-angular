import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent  {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: ['test20@gmail.com', [Validators.required, Validators.email]],
    password: ['1234', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  login(){
    this.usuarioService.login(this.loginForm.value)
        .subscribe( res => {
          this.router.navigateByUrl('/');
        }, (err) => {
          Swal.fire({
            title: 'Error!',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        });
  }

}
