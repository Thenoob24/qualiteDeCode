import { Request, Response, NextFunction } from 'express';
import '../types/express';
import jwt from 'jsonwebtoken';

class AuthentificationMiddlewares {
    constructor() 
    {
        this.verifyToken = this.verifyToken.bind(this);
    }
    
    
    public verifyToken(req: Request, res: Response, next: NextFunction) 
    {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') 
        {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            const secret = process.env.JWT_SECRET;
            if (!secret) 
            {
                return res.status(500).send('JWT secret is not defined');
            }
            jwt.verify(bearerToken, secret, (err, authData) => {
                if (err) 
                {
                    res.status(403).send('Forbidden');
                } else 
                {
                    authData = authData as { userId: number };
                    next();
                }
            });
        }
        else 
        {
            res.status(403).send('Forbidden');
        }
    }
}

export default new AuthentificationMiddlewares();

