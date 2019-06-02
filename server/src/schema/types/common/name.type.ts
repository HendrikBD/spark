import { InputType, ObjectType, Field } from 'type-graphql';
import { MaxLength } from 'class-validator';

@ObjectType('NameType')
@InputType('NameInput')
export class Name {

  @Field()
  first: string;

  @Field()
  middle: string[];

  @Field()
  last: string;

}
