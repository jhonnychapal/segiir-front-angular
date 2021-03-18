import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatGridListModule } from '@angular/material/grid-list';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ProyectosComponent } from './mantenimientos/proyectos/proyectos.component';
import { ProyectoComponent } from './mantenimientos/proyectos/proyecto.component';
import { ProyectoDetallesComponent } from './mantenimientos/proyectos/proyecto-detalles.component';
import { PracticaComponent } from './practica/practica.component';
import { EjemploComponent } from './ejemplo/ejemplo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';



@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    PagesComponent,
    PerfilComponent,
    UsuariosComponent,
    ProyectosComponent,
    ProyectoComponent,
    ProyectoDetallesComponent,
    PracticaComponent,
    EjemploComponent,
  ],
  exports: [
    DashboardComponent,
    AboutComponent,
    ProyectosComponent,
    UsuariosComponent,
    PagesComponent,
    ProyectoComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatDialogModule,
    PdfViewerModule
  ]
})
export class PagesModule { }
