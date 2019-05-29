import { Service, Container} from 'typedi';
import { AuthChecker } from 'type-graphql';

import { ContextType } from '../schema/types/common/context.type';


@Service()
export default class AuthService {

  constructor() {
    console.log('hello from AuthService');
  }

  test() {
    console.log('testing auth service');
  }

}

export const authCheck: AuthChecker<ContextType> = ({context: {user}}, roles) => {
  console.log('auth check');
  (Container.get('AuthService') as AuthService).test();
  return true;
};
