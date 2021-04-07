import express, { Request, Response, NextFunction } from 'express';
import userService from './user.service';

const router = express.Router();

function login(req: Request, res: Response, next: NextFunction) {
  userService
    .login(req.body)
    .then((user) =>
      user
        ? res.json({ ...user, message: 'Login successfull !' })
        : res
            .status(400)
            .json({ message: 'Username or password is incorrect' }),
    )
    .catch((err) => next(err));
}

function register(req: Request, res: Response, next: NextFunction) {
  userService
    .create(req.body)
    .then(() =>
      res
        .status(201)
        .json({ message: 'User has been registered successfully' }),
    )
    .catch((err) => next(err));
}

function getById(req: Request, res: Response, next: NextFunction) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req: Request, res: Response, next: NextFunction) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({ message: 'User has been updated successfully' }))
    .catch((err) => next(err));
}

function _delete(req: Request, res: Response, next: NextFunction) {
  userService
    .delete(req.params.id)
    .then(() => res.json({ message: 'User has been deleted successfully' }))
    .catch((err) => next(err));
}

// routes
router.post('/login', login);
router.post('/register', register);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

export default router;
