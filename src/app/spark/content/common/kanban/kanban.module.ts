import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanDataSource } from './core/kanban.datasource';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    KanbanDataSource
  ]
})
export class KanbanModule { }
