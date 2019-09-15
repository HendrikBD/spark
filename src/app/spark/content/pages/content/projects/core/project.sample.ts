import { Project } from './project.model';

export const ProjectSample: Project = {
  id: 17,
  name: 'Spark',
  rootEntity: {
    kind: {
      id: 28,
      name: 'kanban'
    },
    id: 2,
    name: 'entity',
    boards: [
      {
        id: 7,
        name: 'To Do',
        kind: {
          id: 1,
          name: 'kanbanBoards'
        },
        entities: [
          {
            id: 1,
            name: 'Socetify',
            kind: { id: 7, name: 'kanban' },
            boards: [
              {
                id: 28,
                name: 'Child Board',
                entities: [
                  {
                    id: 9,
                    name: 'Deep Entity',
                    kind: {
                      id: 6,
                      name: 'kanban'
                    },
                    boards: []
                  }
                ]
              }
            ]
          },
          {
            id: 5,
            name: 'Set up simple gql get/post/put',
            kind: { id: 7, name: 'kanban' }
          },
          {
            id: 4,
            name: 'Hook up Kanban Navigation',
            kind: { id: 7, name: 'kanban' }
          },
          {
            id: 3,
            name: 'Redesign Entities in DB',
            kind: { id: 7, name: 'kanban' }
          }
        ]
      },
      {
        id: 7,
        name: 'Build',
        kind: {
          id: 1,
          name: 'kanbanBoards'
        },
        entities: [
          {
            id: 2,
            name: 'Kanban - Front End',
            kind: { id: 7, name: 'kanban' }
          }
        ]
      }
    ]
  }
};
