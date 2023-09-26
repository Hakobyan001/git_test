// Local Modules
import AuthService from './auth.service';
import { ErrorsUtil } from '../utils';

const { UnauthorizedError, PermissionError } = ErrorsUtil;

export default class AuthMiddlaware {
  static authenticate() {
    return (req, res, next) => {
      try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) throw new UnauthorizedError();

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) throw new UnauthorizedError();

        const user = AuthService.validateAccessToken(accessToken);

        if (!user) throw new UnauthorizedError();

        res.locals.auth = { user };
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  static authenticateFor(accessScopes) {
    const access = accessScopes.map((r) => `access:${r}`);
    return (req, res, next) => {
      try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) throw new UnauthorizedError();

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) throw new UnauthorizedError();

        const user = AuthService.validateAccessToken(accessToken);
        if (!user) throw new UnauthorizedError();

        const scope = `access:${user.role}`;

        if (!(access.includes(scope))) throw new PermissionError();
        res.locals.auth = { user };
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  static authenticateForUUID(accessScopes) {
    const access = accessScopes.map((r) => `access:${r}`);
    return (req, res, next) => {
      try {
        const accessToken = req.headers.authorization?.split(' ')[1];
        let user;

        if (accessToken) {
          user = AuthService.validateAccessToken(accessToken);
        } else {
          user = {
            role: 'member'
          };
        }

        const scope = `access:${user?.role}`;

        if (!(access.includes(scope))) throw new PermissionError();
        res.locals.auth = { user };
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
