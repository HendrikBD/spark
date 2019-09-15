import { EntitySimple } from '../../../core/entity.model';

export class Kanban extends EntitySimple {
  boards: KanbanBoard[];
}

export class KanbanBoard extends EntitySimple {
  name: string;
  entities: EntitySimple[];
}
