import { Request } from 'express';
import { expressjwt } from 'express-jwt';
import { Algorithm } from 'jsonwebtoken';

import { UserService } from '../api/v1/user/user.service';
const userService = new UserService();
import publicRoutes from '../config/publicRoutes';

async function isRevoked(req: Request, token: any) {
  const user = await userService.findById(token.payload.sub);
  return !user;
}

function jwt() {
  const secret = process.env.SECRET ?? '12wrty56yu';
  return expressjwt({
    secret,
    algorithms: [(process.env.ALGORITHMS ?? 'HS256') as Algorithm],
    isRevoked,
  }).unless({
    path: publicRoutes,
  });
}

export default jwt;
