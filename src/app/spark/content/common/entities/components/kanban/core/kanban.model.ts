import { Entity } from '../../../core/entity.model';

export class Kanban extends Entity {
  boards: KanbanBoard[];
  description?: string;
}

export class KanbanBoard extends Entity {
  name: string;
  entities: Entity[];
}
