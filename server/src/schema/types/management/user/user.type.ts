import { InputType, ObjectType, Field, Int } from 'type-graphql';
import { MaxLength } from 'class-validator';

@ObjectType()
export class User {

  @Field()
  id?: number;

  @Field()
  username: string;

  @Field()
  email: string;


  // Not included in graphql

  passHash?: string;

}

@InputType()
export class UserBody {

  @Field()
  @MaxLength(30)
  username?: string;

  @Field()
  @MaxLength(255)
  email?: string;

  @Field()
  @MaxLength(255)
  password?: string;

}
