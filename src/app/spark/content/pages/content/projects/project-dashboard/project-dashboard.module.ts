import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { KanbanModule } from '../../../../common/kanban/kanban.module';

import { ProjectDashboardComponent } from './project-dashboard.component';
import { DashboardKanbanComponent } from './components/dashboard-kanban/dashboard-kanban.component';

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
  declarations: [ProjectDashboardComponent, DashboardKanbanComponent],
  imports: [
    CommonModule,
    KanbanModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectDashboardModule { }
