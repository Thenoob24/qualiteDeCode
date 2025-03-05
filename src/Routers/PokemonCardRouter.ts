import { Router } from 'express';
import PokemonCardController from '../controllers/PokemonCardController';
import AuthentificationMiddlewares from '../middlewares/AuthentificationMiddlewares';

class PokemonCardRouter {
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
   *   name: PokemonCards
   *   description: Pokemon card management
   */

  /**
   * @swagger
   * /pokemon-cards:
   *   get:
   *     summary: Get all Pokemon cards
   *     tags: [PokemonCards]
   *     responses:
   *       200:
   *         description: List of Pokemon cards
   *       500:
   *         description: Internal server error
   */
  private initializeRoutes() {
    this.router.get(`${this.routeName}`, PokemonCardController.getAllPokemonCards);

    /**
     * @swagger
     * /pokemon-cards/{pokemonCardId}:
     *   get:
     *     summary: Get a Pokemon card by ID
     *     tags: [PokemonCards]
     *     parameters:
     *       - in: path
     *         name: pokemonCardId
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Pokemon card data
     *       404:
     *         description: Pokemon card not found
     *       500:
     *         description: Internal server error
     */
    this.router.get(`${this.routeName}/:pokemonCardId`, PokemonCardController.getPokemonCardById);

    /**
     * @swagger
     * /pokemon-cards:
     *   post:
     *     summary: Create a new Pokemon card
     *     tags: [PokemonCards]
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
     *               pokedexId:
     *                 type: integer
     *               typeId:
     *                 type: integer
     *               lifePoints:
     *                 type: integer
     *               size:
     *                 type: integer
     *               weight:
     *                 type: integer
     *               imageUrl:
     *                 type: string
     *     responses:
     *       201:
     *         description: Pokemon card created successfully
     *       500:
     *         description: Internal server error
     */
    this.router.post(`${this.routeName}`, AuthentificationMiddlewares.verifyJWT, PokemonCardController.createPokemonCard);

    /**
     * @swagger
     * /pokemon-cards/{pokemonCardId}:
     *   patch:
     *     summary: Update a Pokemon card
     *     tags: [PokemonCards]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: pokemonCardId
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
     *               pokedexId:
     *                 type: integer
     *               typeId:
     *                 type: integer
     *               lifePoints:
     *                 type: integer
     *               size:
     *                 type: integer
     *               weight:
     *                 type: integer
     *               imageUrl:
     *                 type: string
     *     responses:
     *       200:
     *         description: Pokemon card updated successfully
     *       500:
     *         description: Internal server error
     */
    this.router.patch(`${this.routeName}/:pokemonCardId`, AuthentificationMiddlewares.verifyJWT, PokemonCardController.updatePokemonCard);

    /**
     * @swagger
     * /pokemon-cards/{pokemonCardId}:
     *   delete:
     *     summary: Delete a Pokemon card
     *     tags: [PokemonCards]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: pokemonCardId
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: Pokemon card deleted successfully
     *       500:
     *         description: Internal server error
     */
    this.router.delete(`${this.routeName}/:pokemonCardId`, AuthentificationMiddlewares.verifyJWT, PokemonCardController.deletePokemonCard);
  }
}

export default PokemonCardRouter;
