import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ProyectosComponent } from './mantenimientos/proyectos/proyectos.component';
import { ProyectoComponent } from './mantenimientos/proyectos/proyecto.component';
import { ProyectoDetallesComponent } from './mantenimientos/proyectos/proyecto-detalles.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent ,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent },
          { path: 'proyecto-nuevo', component: ProyectoComponent },
          { path: 'perfil', component: PerfilComponent },

          //  Mantenimientos
          { path: 'usuarios', component: UsuariosComponent },
          { path: 'proyectos', component: ProyectosComponent },
          { path: 'proyecto/:id', component: ProyectoDetallesComponent },
        ]
      }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
