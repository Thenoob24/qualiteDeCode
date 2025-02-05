import { Router } from 'express';
import UserController from '../controllers/UserController';

class UserRouter
{

  public routeName: string; 
  public router: Router;
  public controller: UserController;

  constructor(routeName: string) 
  {
    this.routeName = routeName;
    this.router = Router();
    this.controller = new UserController();
    this.initializeRoutes();
  }

  protected initializeRoutes() 
  {
    this.router.post(`${this.routeName}`, this.controller.createUser);
    this.router.post(`${this.routeName}/login`, this.controller.loginUser);
  }

}

export default UserRouter;