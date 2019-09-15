import { Entity } from './entity.model';
import { Kanban } from '../components/kanban/core/kanban.model';

export const entitySample: Entity = {
  id: 2,
  kind: 'kanban',
  name: 'Spark'
};

export const kanbanEntitySample: Kanban = {
  id: 2,
  kind: 'kanban',
  name: 'Spark',
  boards: [
    {
      id: 23,
      kind: 'kanbanBoard',
      name: 'ToDo',
      entities: []
    }
  ]
};
