import 'reflect-metadata';
import { ApolloServer, gql } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import * as path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import jwt from 'express-jwt';

import ErrorService from './services/error.service';
import AuthService from './services/auth.service';
import { authCheck } from './services/auth.service';
import KanbanResolvers from './schema/resolvers/kanban';

dotenv.config();
const errorService = new ErrorService();
Container.set('ErrorHandler', errorService);
Container.set('AuthService', new AuthService(errorService));

const app = express();
Container.set('app', app);

async function bootstrap() {
  const gqlPath = '/graphql';
  const schema = await buildSchema({
    resolvers: [KanbanResolvers as any],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    validate: false,
    authChecker: authCheck,
    container: Container
  });

  app.use('/', bodyParser.json());
  app.post('/login', (Container.get('AuthService') as AuthService).login.bind(Container.get('AuthService')));
  app.post('/create-account', (Container.get('AuthService') as AuthService).createAccount.bind(Container.get('AuthService')));

  app.use('/graphql', (req, res, next) => {
    console.log(req.headers);
    next();
  });

  app.use(
    '*',
    jwt({
      secret: process.env.JWT_KEY,
      credentialsRequired: true
    })
  );

  app.get('/test', (req, res) => {
    console.log('test');
    res.json({test: true});
  });


  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = {
        req,
        user: (req as any).user
      };
      return context;
    },
    playground: process.env.GQL_PLAYGROUND === 'true'
  });


  server.applyMiddleware({ app, path: gqlPath });

  app.listen({ port: 4000 }, () => {
    console.log(`Server is running, available at port: 4000`);
  });

}

bootstrap().catch(console.log);
