import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';

import { PartialsModule } from '../../../common/partials/partials.module';

import { ProjectsDataSource } from './core/projects.datasource';

import { AllProjectsComponent } from './all-projects/all-projects.component';
import { NewProjectComponent } from './new-project/new-project.component';

const routes: Routes = [
  {
    path: '',
    component: AllProjectsComponent
  },
  {
    path: 'new',
    component: NewProjectComponent
  },
  {
    path: 'dashboard',
    loadChildren: './project-dashboard/project-dashboard.module#ProjectDashboardModule'
  }
];

@NgModule({
  declarations: [
    AllProjectsComponent,
    NewProjectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // Local
    PartialsModule,
    // Maerial
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    ProjectsDataSource
  ]
})
export class ProjectsModule { }
