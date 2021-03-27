import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: [ './request-reset.component.css'
  ]
})
export class RequestResetComponent implements OnInit {
  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IsvalidForm = true;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }

  RequestResetUser(form) {
    console.log(form)
    if (form.valid) {
      this.IsvalidForm = true;
      this.authService.requestReset(this.RequestResetForm.value).subscribe(
        data => {
          this.RequestResetForm.reset();
          Swal.fire({
            title:'Recuperación de contraseña!',
            text: 'Enlace para recuperación de contraseña enviado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000);
        },
        err => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
            Swal.fire({
              title:'Recuperación de contraseña!',
              text: this.errorMessage,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }

}
