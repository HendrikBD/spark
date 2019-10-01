import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Kanban } from '../../types/kanban/kanban.type';

@Injectable()
export class KanbanModel {

  dataSource;
  form;

  constructor() {}

  subscribeById(id): BehaviorSubject<Kanban> {
    return new BehaviorSubject(null);
  }

}
