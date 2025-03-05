import request from 'supertest';
import { app } from '../src';
import { prismaMock } from './jest.setup';
import { describe, it, expect, jest } from '@jest/globals';
import bcrypt from 'bcryptjs';

async function getToken() {
  const response = await request(app).post('/users/login').send({
    email: 'testuser@example.com',
    password: 'password123'
  });
  return response.body.token;
}

describe('User API', () => {
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const createdUser = {
        email: 'testuser@example.com',
        password: 'password123'
      };
      prismaMock.user.create.mockResolvedValue({
        id: 1,
        ...createdUser,
        password: await bcrypt.hash(createdUser.password, 10)
      });

      const response = await request(app).post('/users').send(createdUser);

      expect(response.status).toBe(201);
      expect(response.body.email).toEqual(createdUser.email);
    });
  });

  describe('POST /users/login', () => {
    it('should login a user', async () => {
      const user = {
        email: 'testuser@example.com',
        password: 'password123'
      };

      const response = await request(app).post('/users/login').send(user);

      console.log('User from database:', await prismaMock.user.findUnique); // Debug
      console.log('Response:', response.body); // Debug

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: expect.any(String) });

    });
  });
});

