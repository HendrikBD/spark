import { Observer } from 'rxjs';

import { Kanban } from '../components/kanban/core/kanban.model';

export class Entity {
  id: number;
  name: string;
  kind: {
    id: number;
    name: string;
  };
  isVisible?: boolean;
  parentEntity?: Entity | EntitySimple;
}

export class EntitySimple {
  id: number;
  name?: string;
}

export type AnyEntity = Kanban | EntitySimple | Entity;
