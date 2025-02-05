import { Router } from 'express';
import PokemonCardController from '../controllers/PokemonCardController';

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
    this.router.post(`${this.routeName}`, PokemonCardController.createPokemonCard);
    this.router.patch(`${this.routeName}/:pokemonCardId`, PokemonCardController.updatePokemonCard);
    this.router.delete(`${this.routeName}/:pokemonCardId`, PokemonCardController.deletePokemonCard);
  }
}

export default PokemonCardRouter;
