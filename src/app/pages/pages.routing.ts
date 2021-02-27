import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent ,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent },
          { path: 'projects', component: ProjectsComponent },
          { path: 'users', component: UsersComponent },
          { path: 'perfil', component: PerfilComponent },
        ]
      }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
