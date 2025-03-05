import { Router } from 'express';
import UserController from '../controllers/UserController';

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

  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: User management
   */

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       201:
   *         description: User created successfully
   *       500:
   *         description: Internal server error
   */
  protected initializeRoutes() {
    this.router.post(`${this.routeName}`, this.controller.createUser.bind(this.controller));

    /**
     * @swagger
     * /users/login:
     *   post:
     *     summary: Login a user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: User logged in successfully
     *       401:
     *         description: Invalid email or password
     *       500:
     *         description: Internal server error
     */
    this.router.post(`${this.routeName}/login`, this.controller.login.bind(this.controller));

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Get all users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: List of users
     *       500:
     *         description: Internal server error
     */
    this.router.get(`${this.routeName}`, this.controller.getUsers.bind(this.controller));
  }
}

export default UserRouter;