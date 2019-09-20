import { InputType, ObjectType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';

@ObjectType('Entity')
@InputType('EntityInput')
export class Entity {

  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  type?: string;

}

@InputType('EntityUpdate')
export class EntityUpdate {

  @Field()
  id: number;

  @Field()
  name?: string;

  @Field()
  type?: string;

}
