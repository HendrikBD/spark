import KanbanCard from '../../types/kanban/kanbanCard.type';

export default function createSampleKanbanCards(): KanbanCard[] {
  return [
    {
      id: 1,
      description: 'Desc 1',
      label: 'Do a thing'
    },
    {
      id: 2,
      description: 'Desc 2',
      label: 'Recipe 2'
    },
    {
      id: 3,
      description: 'Desc 3',
      label: 'Recipe 3'
    },
  ];
}
