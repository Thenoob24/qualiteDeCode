import request from 'supertest';
import { app } from '../src';
import { prismaMock } from './jest.setup';
import { response } from 'express';

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
}


describe('PokemonCard API', () => {
  describe('GET /pokemon-cards', () => {
    it('should fetch all PokemonCards', async () => {
      const mockPokemonCards:PokemonCard[] = [];

      expect(response.status).toBe(200);
      const res = await request(app).get('/pokemon-cards');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockPokemonCards);
  });

  describe('GET /pokemon-cards/:pokemonCardId', async () => {
    it('should fetch a PokemonCard by ID', async () => {
      const mockPokemonCard:PokemonCard = {
        id: 13,
        name: "Bulbizarre",
        pokedexId: 1,
        typeId: 4,
        lifePoints: 45,
        size: 7,
        weight: 69,
        imageUrl: "https://assets.pokemon.com/assets/cms2/img/cards/web/EX1/EX1_EN_1.png",
      }

      const res = await request(app).get('/pokemon-cards/13');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockPokemonCard);
    });

      const res = await request(app).get('/pokemon-cards/999');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'PokemonCard not found' });
    });
  });

  describe('POST /pokemon-cards', () => {
    it('should create a new PokemonCard', async () => {
      const createdPokemonCard = {}; // Define the createdPokemonCard variable
      const res = await request(app).post('/pokemon-cards').send({});
      expect(res.status).toBe(201);
      expect(res.body).toEqual(createdPokemonCard);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(createdPokemonCard);
    });
  });

  describe('PATCH /pokemon-cards/:pokemonCardId', () => {
      const res = await request(app).patch('/pokemon-cards/1').send({});
      expect(res.status).toBe(200);
      expect(res.body).toEqual(updatedPokemonCard);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedPokemonCard);
    });
      const res = await request(app).delete('/pokemon-cards/1');
      expect(res.status).toBe(204);

  describe('DELETE /pokemon-cards/:pokemonCardId', () => {
    it('should delete a PokemonCard', async () => {
      expect(response.status).toBe(204);
    });
  });
});
