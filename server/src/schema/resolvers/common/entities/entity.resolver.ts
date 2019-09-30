import {
  Resolver,
  Subscription,
  Mutation,
  Query,
  Arg,
  PubSub,
  PubSubEngine,
  Root,
  Args,
} from 'type-graphql';
import { Entity, EntityUpdate } from '../../../types/common/entities/entity.type';

@Resolver()
export default class EntityResolver {

  // Any data object could be implemented with a resolver that includes the ability to create, update, delete,
  // get and watch the data.
  //  - front end subscription will then be a combo of get and sub (to initialize and watch for udpates)

  @Subscription(returns => Entity, { topics: 'ENTITY_UPDATES' })
  subscribeToEntities(@Root() update: EntityUpdate) {
    console.log('sub');
    console.log(update);
    // return { update, msg: 'yo' };
    return update;
  }

  @Query(returns => [Entity])
  getEntities() {
    console.log('getting entities');
    return [{ id: 1, name: 'name', type: 'type' }];
  }

  @Mutation(returns => Boolean, { name: 'updateEntity' })
  async updateEntity(@Arg('entityUpdate') update: EntityUpdate, @PubSub() pubSub: PubSubEngine) {
    console.log('updateEntity');
    console.log(update);

    await pubSub.publish('ENTITY_UPDATES', update);
    return true;
  }

  requiresUpdate({ args, payload, context }) {
    console.log('requiresUpdate?');
    console.log(args);
    console.log(payload);
    console.log(context);

    return true;
  }

}
