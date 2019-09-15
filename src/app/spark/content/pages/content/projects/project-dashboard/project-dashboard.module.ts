import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PartialsModule } from '../../../../common/partials/partials.module';
import { EntitiesModule } from '../../../../common/entities/entities.module';

import { ProjectDashboardComponent } from './project-dashboard.component';
import { DashboardEntitiesComponent } from './components/dashboard-entities/dashboard-entities.component';

const routes: Routes = [
  {
    path: ':projectId',
    component: ProjectDashboardComponent,
  },
  {
    path: '',
    redirectTo: '/projects'
  }
];

@NgModule({
  declarations: [ProjectDashboardComponent, DashboardEntitiesComponent],
  imports: [
    CommonModule,
    PartialsModule,
    RouterModule.forChild(routes),
    EntitiesModule
  ]
})
export class ProjectDashboardModule { }
