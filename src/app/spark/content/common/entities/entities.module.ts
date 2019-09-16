import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialsModule } from '../../common/partials/partials.module';

import { EntitiesComponent } from './entities.component';

// Entity Components
import { KanbanComponent } from './components/kanban/kanban.component';

// Services
import { EntityControlService } from './core/entity-control.service';
import { DynamicEntityComponent } from './dynamic-entity/dynamic-entity.component';
import { KanbanBoardComponent } from './components/kanban/components/kanban-board/kanban-board.component';

@NgModule({
  declarations: [
    EntitiesComponent,
    DynamicEntityComponent,
    // Kanban
    KanbanComponent,
    KanbanBoardComponent
  ],
  imports: [
    CommonModule,
    PartialsModule
  ],
  exports: [
    EntitiesComponent
  ],
  providers: [
    EntityControlService
  ]
})
export class EntitiesModule { }
