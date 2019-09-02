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

const app = express();
Container.set('app', app);

async function bootstrap() {
  const gqlPath = '/graphql';
  const schema = await buildSchema({
    resolvers: [Resolvers as any],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    validate: false,
    authChecker: authCheck,
    container: Container
  });
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = {
        req,
        user: (req as any).user.user
      };
      return context;
    },
    playground: process.env.GQL_PLAYGROUND === 'true'
  });

  app.use('/', bodyParser.json());
  app.post('/login', (Container.get('AuthService') as AuthService).login.bind(Container.get('AuthService')));
  app.post('/create-account', (Container.get('AuthService') as AuthService).createAccount.bind(Container.get('AuthService')));

  app.use('/graphql', (req, res, next) => {
    req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNTU5NDI1NTc0fQ.nmcS7JaJn_CuNe6t7VFydrril0R1vxnqUVzn-h18_Ck';
    next();
  });

  app.use(
    '*',
    jwt({
      secret: process.env.JWT_KEY,
      credentialsRequired: true
    }).unless({
      path: [
        '/create-account',
        '/login'
      ]
    })
  );

  app.get('/test', (req, res) => {
    console.log('test');
    res.json({test: true});
  });

  server.applyMiddleware({ app, path: gqlPath });

  app.listen({ port: 4000 }, () => {
    console.log(`Server is running, available at port: 4000`);
  });

}

bootstrap().catch(console.log);
