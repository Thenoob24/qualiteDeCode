import { Request, Response, NextFunction, RequestHandler } from 'express';
import prisma from '../client';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

class UserController {
  public createUser: RequestHandler;
  public login: RequestHandler;
  public getUsers: RequestHandler;
  public getUser: RequestHandler;
  public updateUser: RequestHandler;
  public deleteUser: RequestHandler;
  public getUserById: RequestHandler;
  public updateUserById: RequestHandler;
  public deleteUserById: RequestHandler;

  constructor() {
    this.createUser = this.createUserHandler.bind(this);
    this.login = this.loginHandler.bind(this);
    this.getUsers = this.getUsersHandler.bind(this);
    this.getUser = this.getUserHandler.bind(this);
    this.updateUser = this.updateUserHandler.bind(this);
    this.deleteUser = this.deleteUserHandler.bind(this);
    this.getUserById = this.getUserByIdHandler.bind(this);
    this.updateUserById = this.updateUserByIdHandler.bind(this);
    this.deleteUserById = this.deleteUserByIdHandler.bind(this);
  }

  private async createUserHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: { email, password: hashedPassword },
      });
      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal server error');
    }
  }

  private async loginHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).send('Invalid email or password');
        return;
      }
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as Secret,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).send('Internal server error');
    }
  }

  private async getUsersHandler(req: Request, res: Response): Promise<void> {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal server error');
    }
  }

  private async getUserHandler(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.userId;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      user ? res.status(200).json(user) : res.status(404).send('User not found');
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).send('Internal server error');
    }
  }

  private async updateUserHandler(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.userId;
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { email, password: hashedPassword },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Internal server error');
    }
  }

  private async deleteUserHandler(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.userId;
      await prisma.user.delete({ where: { id: userId } });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Internal server error');
    }
  }

  private async getUserByIdHandler(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      user ? res.status(200).json(user) : res.status(404).send('User not found');
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).send('Internal server error');
    }
  }

  private async updateUserByIdHandler(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await prisma.user.update({
        where: { id: Number(userId) },
        data: { email, password: hashedPassword },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Internal server error');
    }
  }

  private async deleteUserByIdHandler(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      await prisma.user.delete({ where: { id: Number(userId) } });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Internal server error');
    }
  }
}

export default UserController;
