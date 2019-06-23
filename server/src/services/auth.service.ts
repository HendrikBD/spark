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
        if (!user) {
          this.errorService.respond(res, {
            success: false,
            message: 'No users exists for that email'
          });
        } else {
          return bcrypt.compare(userLogin.password, user.passHash).then(isValid => {
            if (isValid) {
              const token: Token = {
                user: {
                  id: user.id
                }
              };

              res.json({
                success: true,
                jwt: jwt.sign(token, process.env.JWT_KEY)
              });

            } else {

              this.errorService.respond(res, {
                success: false,
                message: 'Invalid Password'
              });
            }
          });
        }
      })
      .catch(err => this.errorService.respond(res, err));

  }

  createAccount(req, res) {
    const saltRounds = 3;

    bcrypt.hash(req.body.password, saltRounds).then((hash) => {

      const newUser: NewUserBody = {
        email: req.body.email,
        name: req.body.name,
        passHash: hash
      };

      return this.userService.create(newUser);

    }).then(insertResponse => {

      return this.userService.getById(insertResponse[0]);

    }).then(userResponse => {
      const token: Token = {
        user: {
          id: userResponse.id
        }
      };

      res.json({success: true, jwt: jwt.sign(token, process.env.JWT_KEY)});

    }).catch(err => this.errorService.respond(res, err));
  }

}

export const authCheck: AuthChecker<Context> = ({context: {user}}, roles) => {
  console.log('auth check');
  const authService: AuthService = Container.get('AuthService');
  authService.test();
  return true;
};
