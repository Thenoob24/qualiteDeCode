import request from 'supertest';
import { app } from '../src';
import { prismaMock } from './jest.setup';

describe('User API', () => {
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const createdUser = {};

      const response = await request(app).post('/users').send(createdUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdUser);
  });

  describe('POST /login', async () => {
      const user = {};
      const token = 'mockedToken';

      const response = await request(app).post('/login').send(user);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        token,
        message: 'Connexion réussie',
      });
      });
    });
  });

