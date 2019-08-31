import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { KanbanComponent } from './kanban.component';

const routes: Routes = [
  {
    path: '**',
    component: KanbanComponent
  }
];

@NgModule({
  declarations: [KanbanComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class KanbanModule { }
