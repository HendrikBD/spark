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

export class UserSimple {

  @Field()
  id: number;

  @Field()
  username?: string;

  @Field()
  email?: string;

}

@InputType()
export class UserLoginBody {

  @Field()
  @MaxLength(255)
  email: string;

  @Field()
  @MaxLength(255)
  password: string;

}

@InputType()
export class NewUserBody {

  @Field()
  @MaxLength(255)
  email: string;

  @Field()
  name: string;

  passHash: string;

}
