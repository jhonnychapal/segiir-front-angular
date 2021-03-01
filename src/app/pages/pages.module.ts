import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ProyectosComponent } from './mantenimientos/proyectos/proyectos.component';
import { NuevoProyectoComponent } from './nuevo-proyecto/nuevo-proyecto.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    PagesComponent,
    PerfilComponent,
    UsuariosComponent,
    ProyectosComponent,
    NuevoProyectoComponent,
  ],
  exports: [
    DashboardComponent,
    AboutComponent,
    ProyectosComponent,
    UsuariosComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule { }
