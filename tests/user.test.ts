import request from 'supertest';
import { app } from '../src';
import { prismaMock } from './jest.setup';
import { describe, it, expect, jest } from '@jest/globals';
import bcrypt from 'bcryptjs';


describe('User API', () => {
  describe('POST /users', () => {
    it('should create a new user', async () => {
      const createdUser = {
        id: 1,
        email: 'testuser@example.com',
        password: 'password123'
      };

      prismaMock.user.create.mockResolvedValue(createdUser);

      const res = await request(app)
        .post('/users')
        .send(createdUser);
        
        expect(res.status).toBe(201);
        expect(res.body).toEqual({
          id: createdUser.id,
          email: createdUser.email,
        });
    });
  });

  describe('POST /users/login', () => {
    it('should login a user', async () => {
      const userLogin = {
        id: 1,
        email: 'testuser@example.com',
        password: 'password123',
      };
      console.log('User from database:', userLogin); // Debug

      prismaMock.user.findUnique.mockResolvedValue(userLogin);

      const res = await request(app)
      .post('/users/login')
      .send(userLogin);

      console.log('Response:', res.body); // Debug

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ token: expect.any(String) });

    });
  });
});

