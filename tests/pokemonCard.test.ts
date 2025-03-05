import request from 'supertest';
import app from '../src'; // Ensure the app is imported correctly
import { prismaMock } from './jest.setup';
import { describe, it, expect } from '@jest/globals';

interface Type {
  id: number;
  name: string;
}

interface PokemonCard {
  id: number;
  name: string;
  pokedexId: number;
  typeId: number;
  lifePoints: number;
  size: number;
  weight: number;
  imageUrl: string;
  weaknessId: number;
}

const mockedToken = 'mockedToken';

describe('PokemonCard API', () => {
  describe('GET /pokemon-cards', () => {
    it('should fetch all PokemonCards', async () => {
      const mockPokemonCards: PokemonCard[] = [];
      prismaMock.pokemonCard.findMany.mockResolvedValue(mockPokemonCards);

      const res = await request(app)
        .get('/pokemon-cards')
        .set('Authorization', `Bearer ${mockedToken}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockPokemonCards);
    });
  });

  describe('GET /pokemon-cards/:pokemonCardId', () => {
    it('should fetch a PokemonCard by ID', async () => {
      const mockPokemonCard: PokemonCard = {
        id: 13,
        name: "Bulbizarre",
        pokedexId: 1,
        typeId: 4,
        lifePoints: 45,
        size: 7,
        weight: 69,
        imageUrl: "https://assets.pokemon.com/assets/cms2/img/cards/web/EX1/EX1_EN_1.png",
        weaknessId: 2, // Fire
      };
      prismaMock.pokemonCard.findUnique.mockResolvedValue(mockPokemonCard);

      const res = await request(app)
        .get('/pokemon-cards/13')
        .set('Authorization', `Bearer ${mockedToken}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockPokemonCard);
    });

    it('should return 404 if PokemonCard not found', async () => {
      prismaMock.pokemonCard.findUnique.mockResolvedValue(null);

      const res = await request(app)
        .get('/pokemon-cards/999')
        .set('Authorization', `Bearer ${mockedToken}`);
      expect(res.status).toBe(404);
    });
  });

  describe('POST /pokemon-cards', () => {
    it('should create a new PokemonCard', async () => {
      const createdPokemonCard = {
        id: 14,
        name: "Charmander",
        pokedexId: 4,
        typeId: 10,
        lifePoints: 39,
        size: 6,
        weight: 85,
        imageUrl: "https://assets.pokemon.com/assets/cms2/img/cards/web/EX1/EX1_EN_4.png",
        weaknessId: null
      };
      prismaMock.pokemonCard.create.mockResolvedValue(createdPokemonCard);

      const res = await request(app)
        .post('/pokemon-cards')
        .set('Authorization', `Bearer ${mockedToken}`)
        .send(createdPokemonCard);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(createdPokemonCard);
    });
  });

  describe('PATCH /pokemon-cards/:pokemonCardId', () => {
    it('should update a PokemonCard', async () => {
      const updatedPokemonCard = {
        id: 1,
        name: "UpdatedName",
        pokedexId: 1,
        typeId: 1,
        lifePoints: 50,
        size: 10,
        weight: 100,
        imageUrl: "https://assets.pokemon.com/assets/cms2/img/cards/web/EX1/EX1_EN_1.png",
        weaknessId: null
      };
      prismaMock.pokemonCard.update.mockResolvedValue(updatedPokemonCard);

      const res = await request(app)
        .patch('/pokemon-cards/1')
        .set('Authorization', `Bearer ${mockedToken}`)
        .send(updatedPokemonCard);
      expect(res.status).toBe(200);
      expect(res.body).toEqual(updatedPokemonCard);
    });
  });

  describe('DELETE /pokemon-cards/:pokemonCardId', () => {
    it('should delete a PokemonCard', async () => {
      prismaMock.pokemonCard.delete.mockResolvedValue({
        id: 1,
        name: "DeletedName",
        pokedexId: 1,
        typeId: 1,
        lifePoints: 0,
        size: 0,
        weight: 0,
        imageUrl: "https://assets.pokemon.com/assets/cms2/img/cards/web/EX1/EX1_EN_1.png",
        weaknessId: null
      });

      const res = await request(app)
        .delete('/pokemon-cards/1')
        .set('Authorization', `Bearer ${mockedToken}`);
      expect(res.status).toBe(204);
    });
  });
});
