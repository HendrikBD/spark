import { Kanban } from './kanban.model';

export const KanbanSample: Kanban = {
  id: 1,
  name: 'Spark',
  kind: {
    id: 2,
    name: 'kanban'
  },
  boards: [
    {
      id: 1,
      name: 'To Do',
      kind: {
        id: 3,
        name: 'kanbanBoard'
      },
      entities: [
        {
          id: 1,
          name: 'Build Dashboard Kanban',
          kind: {
            id: 2,
            name: 'kanbanBoard'
          }
        }
      ]
    },
    {
      id: 2,
      name: 'Planning',
      kind: {
        id: 3,
        name: 'kanbanBoard'
      },
      entities: []
    },
    {
      id: 3,
      name: 'Build',
      kind: {
        id: 3,
        name: 'kanbanBoard'
      },
      entities: []
    },
    {
      id: 4,
      name: 'Review',
      kind: {
        id: 3,
        name: 'kanbanBoard'
      },
      entities: []
    },
    {
      id: 5,
      name: 'Complete',
      kind: {
        id: 3,
        name: 'kanbanBoard'
      },
      entities: []
    }
  ]
};

export const KanbanSamples = {
  kanbans: {
    data: [
      {
        id: 1,
        name: 'Spark',
        boards: [
          {
            id: 1,
            name: 'To Do',
            cards: [
              {
                id: 1,
                name: 'Build Kanban Dashboard',
                boards: [
                ]
              }
            ]
          },
          {
            id: 2,
            name: 'Planning'
          },
          {
            id: 3,
            name: 'Build'
          },
          {
            id: 4,
            name: 'Review'
          },
          {
            id: 5,
            name: 'Complete'
          }
        ]
      }
    ]
  }
};
