import { Kanban } from '../../types/kanban/kanban.type';

export default function createSampleKanbanBoards(): Kanban[] {
  return [
    {
      id: 1,
      label: 'Kaban',
      boards: [
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
        }
      ]
    }
  ];
}
