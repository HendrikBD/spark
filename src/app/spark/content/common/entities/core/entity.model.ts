import { Observer } from 'rxjs';

import { Kanban } from '../components/kanban/core/kanban.model';

export class EntitySimple {
  id: number;
  name: string;
  kind: string;
}

export type Entity = Kanban | EntitySimple;
