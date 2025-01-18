import { testUtils } from '../../../utils/test.utils';

describe('UserController', () => {
  beforeAll(async () => {
    await testUtils.setupDB();
  });

  afterAll(async () => {
    await testUtils.closeDB();
  });

  beforeEach(async () => {
    await testUtils.clearDB();
  });

  it('should register a new user', async () => {
    const response = await testUtils
      .request(testUtils.app)
      .post('/api/v1/user/register')
      .send({
        email: 'test@test.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User has been registered successfully');
  });

  it('should login user', async () => {
    // First register
    await testUtils.request(testUtils.app).post('/api/v1/user/register').send({
      email: 'test@test.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
    });

    // Then login
    const response = await testUtils
      .request(testUtils.app)
      .post('/api/v1/user/login')
      .send({
        email: 'test@test.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body.data.token).toBeDefined();
  });
});
