import { ObjectType, InputType, Field, Int } from 'type-graphql';
import { MaxLength } from 'class-validator';

import { UserSimple } from '../management/user.type';

@ObjectType()
export class Project {

  @Field()
  id: number;

  // @Field()
  // addedBy: UserSimple;

  authorizedUsers?: number[];

}

@InputType({ description: 'New Project' })
export class ProjectInputBody {

  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  addedBy: number;

  authorizedUsers?: UserSimple[];
}
