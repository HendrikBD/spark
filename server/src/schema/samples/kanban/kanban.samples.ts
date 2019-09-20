import { Kanban } from '../../types/common/kanban/kanban.type';

export default function createSampleKanbanBoards(): Kanban[] {
  return [
    {
      id: 1,
      name: 'Kaban',
      boards: [
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
        }
      ]
    }
  ];
}
