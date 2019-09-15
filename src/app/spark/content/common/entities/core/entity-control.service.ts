import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Entity } from './entity.model';
import { Kanban, KanbanBoard } from '../components/kanban/core/kanban.model';

@Injectable()
export class EntityControlService {

  constructor(
    private fb: FormBuilder
  ) {}

  buildEntityControl(entity: Entity, depth = 1): FormGroup {
    switch (entity.kind.name) {
      case 'kanban':
        return this.buildKanbanControl(entity as Kanban, depth);
        break;
      default:
        console.error('no matching entity: ' + entity.kind.name);

    }
  }

  buildKanbanControl(kanban: Kanban, depth = 1) {
    return this.fb.group({
      id: [kanban.id],
      kind: [kanban.kind],
      name: [kanban.name],
      description: [kanban.description],
      boards: kanban.boards instanceof Array
        ? this.fb.array(kanban.boards.map(board => this.buildKanbanBoardControl(board, depth)))
        : this.fb.array([])
    });
  }

  buildKanbanBoardControl(board: KanbanBoard, depth = 1) {
    return this.fb.group({
      id: [board.id],
      kind: [board.kind],
      name: [board.name],
      entities: board.entities instanceof Array && depth > 0
        ? this.fb.array(board.entities.map(entity => this.buildEntityControl(entity, depth - 1)))
        : [board.entities],
      isVisible: [board.isVisible]
    });
  }

}
