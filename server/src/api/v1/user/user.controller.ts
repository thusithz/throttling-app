import express, { Request, Response, NextFunction, Router } from 'express';
import { userService } from './user.service';
import { UserResponse } from './responses/UserResponse';

export class UserController {
  private router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/login', this.handleAsync(this.login));
    this.router.post('/register', this.handleAsync(this.register));
    this.router.get('/:id', this.handleAsync(this.getById));
    this.router.put('/:id', this.handleAsync(this.update));
    this.router.delete('/:id', this.handleAsync(this.delete));
  }

  private handleAsync(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      fn.bind(this)(req, res, next).catch(next);
    };
  }

  private async login(req: Request, res: Response) {
    const user = await userService.login(req.body);
    if (!user) {
      return UserResponse.badRequest(res, 'Invalid credentials');
    }
    return UserResponse.success(res, user, 'Login successful!');
  }

  private async register(req: Request, res: Response) {
    await userService.create(req.body);
    return UserResponse.created(res, 'User has been registered successfully');
  }

  private async getById(req: Request, res: Response) {
    const user = await userService.findById(req.params.id);
    return user ? UserResponse.success(res, user) : UserResponse.notFound(res);
  }

  private async update(req: Request, res: Response) {
    await userService.update(req.params.id, req.body);
    return UserResponse.success(
      res,
      null,
      'User has been updated successfully',
    );
  }

  private async delete(req: Request, res: Response) {
    await userService.delete(req.params.id);
    return UserResponse.success(
      res,
      null,
      'User has been deleted successfully',
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default new UserController().getRouter();
