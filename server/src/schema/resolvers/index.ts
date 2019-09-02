import KanbanResolvers from './common/kanban';
import ProjectResolver from './projects';

export default [
  ...KanbanResolvers,
  ...ProjectResolver
];
