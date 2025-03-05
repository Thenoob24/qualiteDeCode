import { Router } from 'express';
import AttackCardController from '../controllers/AttackCardController';
import AuthentificationMiddlewares from '../middlewares/AuthentificationMiddlewares';

class AttackCardRouter {
  public router: Router;
  public routeName: string;

  constructor(routeName: string) {
    this.routeName = routeName;
    this.router = Router();
    this.initializeRoutes();
  }

  /**
   * @swagger
   * tags:
   *   name: AttackCards
   *   description: Attack card management
   */

  /**
   * @swagger
   * /attack-cards:
   *   get:
   *     summary: Get all attack cards
   *     tags: [AttackCards]
   *     responses:
   *       200:
   *         description: List of attack cards
   *       500:
   *         description: Internal server error
   */
  private initializeRoutes() {
    this.router.get(`${this.routeName}`, AttackCardController.getAllAttackCards);

    /**
     * @swagger
     * /attack-cards/{attackCardId}:
     *   get:
     *     summary: Get an attack card by ID
     *     tags: [AttackCards]
     *     parameters:
     *       - in: path
     *         name: attackCardId
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Attack card data
     *       404:
     *         description: Attack card not found
     *       500:
     *         description: Internal server error
     */
    this.router.get(`${this.routeName}/:attackCardId`, AttackCardController.getAttackCardById);

    /**
     * @swagger
     * /attack-cards:
     *   post:
     *     summary: Create a new attack card
     *     tags: [AttackCards]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               damages:
     *                 type: integer
     *               typeId:
     *                 type: integer
     *     responses:
     *       201:
     *         description: Attack card created successfully
     *       500:
     *         description: Internal server error
     */
    this.router.post(`${this.routeName}`, AuthentificationMiddlewares.verifyJWT, AttackCardController.createAttackCard);

    /**
     * @swagger
     * /attack-cards/{attackCardId}:
     *   patch:
     *     summary: Update an attack card
     *     tags: [AttackCards]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: attackCardId
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               damages:
     *                 type: integer
     *               typeId:
     *                 type: integer
     *     responses:
     *       200:
     *         description: Attack card updated successfully
     *       500:
     *         description: Internal server error
     */
    this.router.patch(`${this.routeName}/:attackCardId`, AuthentificationMiddlewares.verifyJWT, AttackCardController.updateAttackCard);

    /**
     * @swagger
     * /attack-cards/{attackCardId}:
     *   delete:
     *     summary: Delete an attack card
     *     tags: [AttackCards]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: attackCardId
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: Attack card deleted successfully
     *       500:
     *         description: Internal server error
     */
    this.router.delete(`${this.routeName}/:attackCardId`, AuthentificationMiddlewares.verifyJWT, AttackCardController.deleteAttackCard);
  }
}

export default AttackCardRouter;
