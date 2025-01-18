import { testUtils } from '../utils/test.utils';
import { createClient } from 'redis';

describe('IP Limiter Middleware', () => {
  let redis: any;

  beforeAll(async () => {
    redis = createClient();
    await redis.connect();
  });

  afterAll(async () => {
    await redis.quit();
  });

  beforeEach(async () => {
    await redis.flushAll();
  });

  it('should allow requests under limit', async () => {
    const response = await testUtils
      .request(testUtils.app)
      .get('/api/v1/user/test-route');

    expect(response.status).not.toBe(429);
  });

  it('should block requests over limit', async () => {
    // Make 101 requests
    for (let i = 0; i < 101; i++) {
      await testUtils.request(testUtils.app).get('/api/v1/user/test-route');
    }

    const response = await testUtils
      .request(testUtils.app)
      .get('/api/v1/user/test-route');

    expect(response.status).toBe(429);
  });
});
