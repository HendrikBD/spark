import { KanbanBoard } from '../../types/common/kanban/kanban-board.type';

export default function createSampleKanbanBoards(): KanbanBoard[] {
  return [
    {
      id: 1,
      name: 'ToDo',
      description: '',
      cards: [
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
        }
      ]
    },
    {
      id: 1,
      name: 'Planning',
      description: '',
      cards: [
        {
          id: 4,
          description: 'To ensure maximum efficiency, I should cancel ALL unnecessary subscriptions',
          name: 'Cancel Subscriptions'
        }
      ]
    }
  ];
}
