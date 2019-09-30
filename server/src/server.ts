import 'reflect-metadata';
// import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServer, gql } from 'apollo-server-express';
import { graphqlExpress } from 'apollo-server-express/dist/expressApollo';
// import { ApolloServer, gql } from 'apollo-server';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { createServer } from 'http';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import * as path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { execute, subscribe } from 'graphql';

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


  console.log('Initializing server...');

  const port = 4000;
  const gqlPath = '/graphql';

  // Setting up playground with access token to allow access
  // app.use('/graphql', (req, res, next) => {
  //   req.headers.authorization = process.env.PLAYGROUND_AUTH;
  //   next();
  // });


  console.log('Building schema...');

  // Building schema off of the type-graphql stuff
  const schema = await buildSchema({
    resolvers: [Resolvers as any],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    validate: false,
    authChecker: authCheck,
    container: Container,
  });

  console.log('Applying middlewares & auth routes...');

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
  // app.get('/test', (req, res) => {
  //   console.log('test');
  //   res.json({ test: true });
  // });


  // Starting an apollo server
  // const server = new ApolloServer({
  //   schema,
  //   // context: ({ req }) => {
  //   //   const context = {
  //   //     req,
  //   //     user: (req as any).user.user,
  //   //   };
  //   //   return context;
  //   // },
  //   playground: true
  // });


  console.log('Applying graphql schema...');

  app.use('/graphql', graphqlExpress({ schema }));

  console.log('Creating server...');
  const server = createServer(app);

  // server.listen({ port: 4000 });

  console.log('Server created:');
  console.log(server);

  // Applyies gql server as middleware(?) to app
  // server.applyMiddleware({ app });

  console.log('Listening to server...');
  // Beginning app as server
  await server.listen({ port: 4000 });

  console.log(`Server is running, available at: http://localhost:4000/graphql`);
  console.log(server);

  const sub = new SubscriptionServer({
    execute,
    subscribe,
    schema,
    onConnect(ctx, socket) {
      console.log('Something connected!');
      console.log('ctx');
      console.log(ctx);
      console.log('socket');
      console.log(socket);
    }
  },
    { server, path: '/graphql'}
  );

  sub.server.on('error', (ctx, socket) => {
    console.error('Error!');
    console.log('ctx');
    console.log(ctx);
    console.log('Arg 2');
    console.log(socket);
  });

}

bootstrap().catch(console.log);
