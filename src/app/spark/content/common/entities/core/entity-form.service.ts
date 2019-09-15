import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Entity } from './entity.model';
import { Kanban } from '../components/kanban/core/kanban.model';

@Injectable()
export class EntityFormService {

  constructor(
    private fb: FormBuilder
  ) {}

  buildEntityForm(entity: Entity): FormGroup {
    switch (entity.kind) {
      case 'kanban':
        return this.buildKanbanForm(entity as Kanban);
        break;

    }
  }

  buildKanbanForm(kanban: Kanban) {
    return this.fb.group({
      id: [kanban.id],
      kind: [kanban.kind],
      name: [kanban.name],
      boards: [kanban.boards]
    })
  }

}
