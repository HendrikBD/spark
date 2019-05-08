import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import * as path from 'path';
import { buildSchema } from 'type-graphql';

import KanbanCardResolver from './schema/resolvers/kanban/kanbanCard.resolver';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [KanbanCardResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  });

  const server  = new ApolloServer({
    schema,
    playground: true
  });

  const { url } = await server.listen(4000);
  console.log(`Server is running, available at ${url}`);
}

bootstrap().catch(console.log);
