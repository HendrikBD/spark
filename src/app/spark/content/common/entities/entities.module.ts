import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialsModule } from '../../common/partials/partials.module';

import { EntitiesComponent } from './entities.component';

// Entity Components
import { KanbanComponent } from './components/kanban/kanban.component';

// Services
import { EntityControlService } from './core/services/entity-control.service';
import { EntityService } from './core/services/entity.service';
import { DynamicEntityComponent } from './dynamic-entity/dynamic-entity.component';
import { KanbanBoardComponent } from './components/kanban/components/kanban-board/kanban-board.component';

// Directives
import { EntityDraggableDirective } from './core/directives/entity-draggable.directive';

@NgModule({
  declarations: [
    EntitiesComponent,
    DynamicEntityComponent,
    EntityDraggableDirective,
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
    EntityControlService,
    EntityService
  ]
})
export class EntitiesModule { }
