import request from 'supertest';
import app from '../app';
import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('User API', () => {
  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const res = await request(app).get('/api/users');
      assert.strictEqual(res.statusCode, 200);
      assert.ok(Array.isArray(res.body));
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com'
      };
      const res = await request(app).post('/api/users').send(userData);

      assert.strictEqual(res.statusCode, 201);
      assert.ok('id' in res.body);
      assert.strictEqual(res.body.name, userData.name);
    });

    it('should validate request data', async () => {
      const invalidData = {
        email: 'not-an-email'
      };
      const res = await request(app).post('/api/users').send(invalidData);

      assert.strictEqual(res.statusCode, 400);
    });
  });
});

export {};
