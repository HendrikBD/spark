import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import * as path from 'path';
import dotenv from 'dotenv';

import ErrorService from './services/error.service';
import KanbanResolvers from './schema/resolvers/kanban';

dotenv.config();
Container.set('ErrorHandler', new ErrorService());

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [<any>KanbanResolvers],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    validate: false,
    container: Container
  });

  const server  = new ApolloServer({
    schema,
    context: (context) => {
      console.log('context');
    },
    playground: true
  });

  const { url } = await server.listen(4000);
  console.log(`Server is running, available at ${url}`);
}

bootstrap().catch(console.log);
