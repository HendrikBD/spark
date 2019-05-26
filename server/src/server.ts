import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import * as path from 'path';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import ErrorService from './services/error.service';

Container.set('ErrorHandler', new ErrorService());

import KanbanResolvers from './schema/resolvers/kanban';
// import KanbanCardResolver from './schema/resolvers/kanban/kanban-card.resolver';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [<any>KanbanResolvers],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    validate: false,
    container: Container
  });

  const server  = new ApolloServer({
    schema,
    context: (stuff) => {
      console.log(stuff);
      console.log('other stuff');
      console.log('context');
    },
    playground: true
  });

  const { url } = await server.listen(4000);
  console.log(`Server is running, available at ${url}`);
}

bootstrap().catch(console.log);
