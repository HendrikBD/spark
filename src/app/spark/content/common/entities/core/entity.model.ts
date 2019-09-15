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
}

export type AnyEntity = Kanban | Entity;
