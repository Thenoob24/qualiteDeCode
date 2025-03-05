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

  private initializeRoutes() {
    this.router.get(`${this.routeName}`, PokemonCardController.getAllPokemonCards);
    this.router.get(`${this.routeName}/:pokemonCardId`, PokemonCardController.getPokemonCardById);
    this.router.post(`${this.routeName}`, AuthentificationMiddlewares.verifyJWT, PokemonCardController.createPokemonCard);
    this.router.patch(`${this.routeName}/:pokemonCardId`, AuthentificationMiddlewares.verifyJWT, PokemonCardController.updatePokemonCard);
    this.router.delete(`${this.routeName}/:pokemonCardId`, AuthentificationMiddlewares.verifyJWT, PokemonCardController.deletePokemonCard);
  }
}

export default PokemonCardRouter;
