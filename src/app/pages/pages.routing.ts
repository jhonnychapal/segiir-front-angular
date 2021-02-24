import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent ,
        children: [
          { path: '', component: DashboardComponent },
          { path: 'projects', component: ProjectsComponent },
          { path: 'users', component: UsersComponent },
        ]
      }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
