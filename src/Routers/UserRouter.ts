import { Router } from 'express';
import UserController, { login } from '../controllers/UserController';

class UserRouter {
  public routeName: string;
  public router: Router;
  public controller: UserController;

  constructor(routeName: string) {
    this.routeName = routeName;
    this.router = Router();
    this.controller = new UserController();
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.post(`${this.routeName}`, this.controller.createUser.bind(this.controller));
    this.router.post(`${this.routeName}/login`, login.bind(this.controller));
    this.router.get(`${this.routeName}`, this.controller.getUsers.bind(this.controller));
  }
}

export default UserRouter;