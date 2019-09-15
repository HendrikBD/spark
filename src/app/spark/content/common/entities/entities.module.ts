import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntitiesComponent } from './entities.component';

// Entity Components
import { KanbanComponent } from './components/kanban/kanban.component';

// Services
import { EntityControlService } from './core/entity-control.service';
import { DynamicEntityComponent } from './dynamic-entity/dynamic-entity.component';

@NgModule({
  declarations: [EntitiesComponent, KanbanComponent, DynamicEntityComponent],
  imports: [
    CommonModule
  ],
  exports: [
    EntitiesComponent
  ],
  providers: [
    EntityControlService
  ]
})
export class EntitiesModule { }
