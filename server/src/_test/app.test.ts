import supertest from 'supertest';
import mockDB from './setup';

import app from '../app';
import User from '../api/v1/user/user.model';

mockDB.setupDB('throttling-user-testing', true);

jest.setTimeout(10000);

//TODO need to tune up futher
xdescribe('App.ts', () => {

  describe('/api/v1/user/register', () => {

    test('Registration validation', async () => {
      const UserValidation = await User.create({ firstName: 'Test 1', email: 'test@gmail.com', hash: '1234Asdfg@' });
      expect(UserValidation).toBeDefined();
    });

    test('POST', async () => {
      const post = await User.create({ firstName: 'Test 1', lastName: 'Test 1', email: 'test@gmail.com', hash: '1234Asdfg@' });

      await supertest(app)
        .post('api/v1/user/register')
        .expect(201)
        .then((response) => {
          // Check type and length
          console.log('Response.body', response.body)
          expect(Array.isArray(response.body)).toBeTruthy();
        });
    });
  });

});