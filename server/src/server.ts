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
import Resolvers from './schema/resolvers';

dotenv.config();
const errorService = new ErrorService();
Container.set('ErrorHandler', errorService);
Container.set('AuthService', new AuthService(errorService));

// Setting up app and putting in container
const app = express();
Container.set('app', app);

// Bootstrap
async function bootstrap() {
  const gqlPath = '/graphql';
  // Building schema off of the type-graphql stuff
  const schema = await buildSchema({
    resolvers: [Resolvers as any],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    validate: false,
    authChecker: authCheck,
    container: Container,
  });

  // Starting an apollo server
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = {
        req,
        user: (req as any).user.user,
      };
      return context;
    },
    playground: process.env.GQL_PLAYGROUND === 'true',
  });

  // Adding useful middlewares
  app.use('/', bodyParser.json());

  // Setting up auth routes outside of gql
  app.post(
    '/login',
    (Container.get('AuthService') as AuthService).login.bind(Container.get('AuthService'))
  );
  app.post(
    '/create-account',
    (Container.get('AuthService') as AuthService).createAccount.bind(Container.get('AuthService'))
  );

  // Setting up playground with access token to allow access
  app.use('/graphql', (req, res, next) => {
    req.headers.authorization = process.env.PLAYGROUND_AUTH;
    next();
  });

  // Setting up jwt check for every route except auth routes
  app.use(
    '*',
    jwt({
      secret: process.env.JWT_KEY,
      credentialsRequired: true,
    }).unless({
      path: ['/create-account', '/login'],
    })
  );

  // Test route
  app.get('/test', (req, res) => {
    console.log('test');
    res.json({ test: true });
  });

  // Applyies gql server as middleware(?) to app
  server.applyMiddleware({ app, path: gqlPath });

  // Beginning app as server
  app.listen({ port: 4000 }, () => {
    console.log(`Server is running, available at port: 4000`);
  });
}

bootstrap().catch(console.log);
