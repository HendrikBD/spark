import { KanbanCard } from '../../types/common/kanban/kanban-card.type';

export default function createSampleKanbanCards(): KanbanCard[] {
  return [
    {
      id: 1,
      description: 'Desc 1',
      name: 'Do a thing'
    },
    {
      id: 2,
      description: 'Desc 2',
      name: 'Recipe 2'
    },
    {
      id: 3,
      description: 'Desc 3',
      name: 'Recipe 3'
    },
  ];
}
