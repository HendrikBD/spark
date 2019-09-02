import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PartialsModule } from '../../../common/partials/partials.module';

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
  }
];

@NgModule({
  declarations: [AllProjectsComponent, NewProjectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PartialsModule
  ]
})
export class ProjectsModule { }
