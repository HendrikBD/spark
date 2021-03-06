import { Entity } from '../entity.type';

export class Kanban extends Entity {
  boards: KanbanBoard[];
  description?: string;
}

export class KanbanBoard extends Entity {
  name: string;
  description?: string;
  entities: Entity[];
}
