import KanbanBoard from '../../types/kanban/kanban-board.type';

export default function createSampleKanbanBoards(): KanbanBoard[] {
  return [
    {
      id: 1,
      label: 'ToDo',
      description: '',
      cards: [
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
        }
      ]
    },
    {
      id: 1,
      label: 'Planning',
      description: '',
      cards: [
        {
          id: 4,
          description: 'To ensure maximum efficiency, I should cancel ALL unnecessary subscriptions',
          label: 'Cancel Subscriptions'
        }
      ]
    }
  ];
}
