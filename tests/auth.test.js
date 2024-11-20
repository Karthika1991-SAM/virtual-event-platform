const request = require('supertest');
const app = require('../src/app');

describe('Authentication Endpoints', () => {
  let token;

  test('Should register a new user', async () => {
    const res = await request(app).post('/auth/register').send({
      username: 'John Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123',
      role: 'attendee', // If your model requires this
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  test('Should login and receive a token', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'john.doe@example.com',
      password: 'securePassword123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token; // Save token for later use
  });
});
