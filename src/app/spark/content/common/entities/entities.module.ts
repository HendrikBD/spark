import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntitiesComponent } from './entities.component';

// Entity Components
import { KanbanComponent } from './components/kanban/kanban.component';

// Services
import { EntityFormService } from './core/entity-form.service';

@NgModule({
  declarations: [EntitiesComponent, KanbanComponent],
  imports: [
    CommonModule
  ],
  exports: [
    EntitiesComponent
  ],
  providers: [
    EntityFormService
  ]
})
export class EntitiesModule { }
