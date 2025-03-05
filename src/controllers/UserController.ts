import { Request, Response } from 'express';
import prisma from '../client';
const bcrypt = require('bcrypt');
import jwt, { Secret } from 'jsonwebtoken';

class UserController {
  constructor() {
    this.createUser = this.createUser.bind(this);
  }

  /**
   * @swagger
   * components:
   *   securitySchemes:
   *     bearerAuth:
   *       type: http
   *       scheme: bearer
   *       bearerFormat: JWT
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *         email:
   *           type: string
   *         password:
   *           type: string
   */

  public async createUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log('Request body:', req.body);
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal server error');
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
          expiresIn: '1d',
        });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Internal server error');
    }
  }

  public async getUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal server error');
    }
  }
}

export default UserController;