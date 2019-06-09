import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import { HttpLink as myHttpLink } from 'apollo-link-http';

const uri = 'http://localhost:8000/graphql/'; // <-- add the URL of the GraphQL server here
const LINK: myHttpLink = new myHttpLink({
  uri: 'http://localhost:4000/graphql',
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'application/json'
    // "Access-Control-Allow-Credentials" : true
    // "X-CSRFToken": Cookies.get('csrftoken')
    },
  useGETForQueries: true
});

export function createApollo(httpLink: myHttpLink) {
  return {
    link: LINK,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    },
  ],
})

export class GraphQLModule {}
