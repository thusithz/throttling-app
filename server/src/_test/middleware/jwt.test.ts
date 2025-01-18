import { testUtils } from '../utils/test.utils';
import jwt from 'jsonwebtoken';

describe('JWT Middleware', () => {
  it('should allow access with valid token', async () => {
    const token = jwt.sign({ sub: '123' }, process.env.SECRET || '12wrty56yu');

    const response = await testUtils
      .request(testUtils.app)
      .get('/api/v1/user/protected-route')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).not.toBe(401);
  });

  it('should block access with invalid token', async () => {
    const response = await testUtils
      .request(testUtils.app)
      .get('/api/v1/user/protected-route')
      .set('Authorization', 'Bearer invalid-token');

    expect(response.status).toBe(401);
  });
});
