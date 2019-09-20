import KanbanResolvers from './common/kanban';
import ProjectResolver from './projects';
import EntityResolver from './common/entities/entity.resolver';

export default [
  ...KanbanResolvers,
  ...ProjectResolver,
  EntityResolver
];
