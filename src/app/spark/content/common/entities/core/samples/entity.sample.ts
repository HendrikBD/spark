import { Entity } from '../types/entity.type';
import { Kanban } from '../types/kanban/kanban.type';

export const entitySample: Entity = {
  id: 2,
  kind: {
    id: 2,
    name: 'kanban'
  },
  name: 'Spark'
};

export const kanbanEntitySample: Kanban = {
  id: 2,
  kind: {
    id: 2,
    name: 'kanban'
  },
  name: 'Spark',
  boards: [
    {
      id: 23,
      kind: {
        id: 3,
        name: 'kanbanBoard'
      },
      name: 'ToDo',
      entities: []
    }
  ]
};
