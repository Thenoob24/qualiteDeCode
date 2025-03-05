import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

class AuthentificationMiddlewares {
  constructor() {
    this.verifyJWT = this.verifyJWT.bind(this);
  }

  public verifyJWT(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const secret = process.env.JWT_SECRET as jwt.Secret;
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          res.status(403).send('Forbidden');
        } else {
          res.locals.userId = (decodedToken as { userId: string }).userId;
          next();
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
}

export default new AuthentificationMiddlewares();

