import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ProyectosComponent } from './mantenimientos/proyectos/proyectos.component';
import { ProyectoComponent } from './mantenimientos/proyectos/proyecto.component';
import { ProyectoDetallesComponent } from './mantenimientos/proyectos/proyecto-detalles.component';
import { PracticaComponent } from './practica/practica.component';
import { EjemploComponent } from './ejemplo/ejemplo.component'
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent ,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent },
          { path: 'proyecto-nuevo', canActivate: [AdminGuard], component: ProyectoComponent },
          { path: 'perfil', component: PerfilComponent },

          // GIIR- RUP
          { path: 'practica', component: PracticaComponent},
          { path: 'ejemplo', component: EjemploComponent},

          //  Mantenimientos
          { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent },
          { path: 'proyectos', component: ProyectosComponent },
          { path: 'proyectos/:id', component: ProyectoDetallesComponent },
        ]
      }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
