import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from 'apollo-link-ws';
import gql from 'graphql-tag';

import { HttpLink as myHttpLink } from 'apollo-link-http';

export function createApollo(httpLink: myHttpLink) {
  console.log('Creating apollo server');

  const client = new SubscriptionClient('ws:localhost:4000/graphql', { reconnect: true });
  const link = new WebSocketLink(client);

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
