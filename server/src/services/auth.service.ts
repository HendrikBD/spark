import { Service, Container} from 'typedi';
import { AuthChecker } from 'type-graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import ErrorService from './error.service';
import UserService from './pg/management/user.service';

import { User, UserLoginBody, NewUserBody } from '../schema/types/management/user.type';
import { Context } from '../schema/types/common/context.type';
import { Token } from '../schema/types/management/token.type';


@Service()
export default class AuthService {

  errorService: ErrorService;
  userService: UserService;

  constructor(errorService) {
    console.log('hello from AuthService');
    this.errorService = errorService;
    this.userService = new UserService(Container);
  }

  test() {
    console.log('testing auth service');
  }

  login(req, res) {
    const userLogin: UserLoginBody = {
      email: req.body.email,
      password: req.body.password
    };

    this.userService.getForLogin(userLogin.email)
      .then(user => {
        if (!user) console.error('No user for passed email');
        else {
          return bcrypt.compare(userLogin.password, user.passHash).then(isValid => {
            if (isValid) {
              const testToken: Token = {
                user: {
                  id: user.id
                }
              };

              res.json({
                success: true,
                jwt: jwt.sign(testToken, process.env.JWT_KEY)
              });

            } else {
              res.json({
                success: false,
                message: 'Invalid Password'
              });
            }
          });
        }
      })
      .catch(console.error);

  }

  createAccount(req, res) {
    const saltRounds = 3;

    bcrypt.hash(req.body.password, saltRounds).then((hash) => {
      const newUser: NewUserBody = {
        email: req.body.email,
        name: req.body.name,
        passHash: hash
      };
      this.userService.create(newUser).then(() => {
        res.json({success: true});
      }).catch(() => {
        res.json({success: false});
      });

    }).catch(console.error);
  }

}

export const authCheck: AuthChecker<Context> = ({context: {user}}, roles) => {
  console.log('auth check');
  const authService: AuthService = Container.get('AuthService');
  authService.test();
  return true;
};
