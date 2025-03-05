import { Request, Response } from 'express';
import prisma from '../client';

class PokemonCardController {
  /*
  * Constructeur
  */
  constructor() 
  {
    this.getAllPokemonCards = this.getAllPokemonCards.bind(this);
    this.getPokemonCardById = this.getPokemonCardById.bind(this);
    this.createPokemonCard = this.createPokemonCard.bind(this);
    this.updatePokemonCard = this.updatePokemonCard.bind(this);
    this.deletePokemonCard = this.deletePokemonCard.bind(this);
  }

  /**
   * @swagger
   * components:
   *   schemas:
   *     Type:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *         name:
   *           type: string
   *     PokemonCard:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *         name:
   *           type: string
   *         pokedexId:
   *           type: integer
   *         typeId:
   *           type: integer
   *         lifePoints:
   *           type: integer
   *         size:
   *           type: integer
   *         weight:
   *           type: integer
   *         imageUrl:
   *           type: string
   *         weaknessId:
   *           type: integer
   *         weakness:
   *           $ref: '#/components/schemas/Type'
   */

  /*
  * Méthodes getAllPokemonCars retourne toutes les données des cartes pokemon
  */
  public async getAllPokemonCards(req: Request, res: Response) {
    try {
      const pokemons = await prisma.pokemonCard.findMany({
        include: { type: true },
      });
      res.status(200).json(pokemons);
    } catch (error) {
      console.error('Error fetching all Pokemon cards:', error);
      res.status(500).send('Internal server error');
    }
  }

  /*
  * Méthodes getPokemonCardById retourne les données d'une carte pokemon par son ID
  */
  public async getPokemonCardById(req: Request, res: Response) {
    try {
      const { pokemonCardId } = req.params;
      const pokemon = await prisma.pokemonCard.findUnique({
        where: { id: Number(pokemonCardId) },
        include: { type: true, weakness: true },
      });
      if (pokemon) {
        res.status(200).json(pokemon);
      } else {
        res.status(404).send('PokemonCard not found');
      }
    } catch (error) {
      console.error('Error fetching Pokemon card by ID:', error);
      res.status(500).send('Internal server error');
    }
  }

  /*
  * Méthodes createPokemonCard créer une nouvelle carte pokemon
  */
  public async createPokemonCard(req: Request, res: Response)
   {
    try {
      const { name, pokedexId, typeId, lifePoints, size, weight, imageUrl, weaknessId } = req.body;
      const userId = res.locals.userId; // Use the user ID from res.locals
      console.log('Request body:', req.body); // Log the request body to verify the data
      const newPokemonCard = await prisma.pokemonCard.create({
        data: {
          name,
          pokedexId,
          typeId,
          lifePoints,
          size,
          weight,
          imageUrl,
          weaknessId,
        },
      });
      res.status(201).json(newPokemonCard);
    } catch (error) {
      console.error('Error creating Pokemon card:', error);
      res.status(500).send('Internal server error');
    }
  }

  /*
  * Méthodes updatePokemonCard mettre à jour les données d'une carte pokemon
  */
  public async updatePokemonCard(req: Request, res: Response) {
    try {
      const { pokemonCardId } = req.params;
      const updatedData = req.body;
      const updatedPokemonCard = await prisma.pokemonCard.update({
        where: { id: Number(pokemonCardId) },
        data: updatedData,
      });
      res.status(200).json(updatedPokemonCard);
    } catch (error) {
      console.error('Error updating Pokemon card:', error);
      res.status(500).send('Internal server error');
    }
  }
/*
* Méthodes deletePokemonCard supprimer une carte pokemon
*/
  public async deletePokemonCard(req: Request, res: Response)
{
    try {
      const { pokemonCardId } = req.params;
      await prisma.pokemonCard.delete({
        where: { id: Number(pokemonCardId) },
      });
      res.status(204).send('Pokemon card deleted');
    } catch (error) {
      console.error('Error deleting Pokemon card:', error);
      res.status(500).send('Internal server error');
    }
  }
}

export default new PokemonCardController();