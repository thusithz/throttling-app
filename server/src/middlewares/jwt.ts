import { Request } from 'express';
import expressJwt from 'express-jwt';

import userService from '../api/v1/user/user.service';

// eslint-disable-next-line
async function isRevoked(req: Request, payload: any, next: any) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return next(null, true);
  }
  next();
};

function jwt(){
  const secret = process.env.SECRET || '12wrty56yu';
  return expressJwt({ secret, algorithms: [process.env.ALGORITHMS || 'HS256'], isRevoked }).unless({
    path: [
      // exclude public routes that are n't require authentication
      '/api/v1/user/login',
      '/api/v1/user/register',
    ],
  });
}

export default jwt;
