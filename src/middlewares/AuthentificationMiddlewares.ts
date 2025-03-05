import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: { id: string };
  }
}
import jwt from 'jsonwebtoken';

class AuthentificationMiddlewares {
  constructor() {
    this.verifyJWT = this.verifyJWT.bind(this);
  }

  public verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as { userId: string };
        req.user = { id: decodedToken.userId }; // Set userId in request object
        next();
      } catch (error) {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  };
}

export default new AuthentificationMiddlewares();

