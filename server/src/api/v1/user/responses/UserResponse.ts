import { Response } from 'express';

export class UserResponse {
  static success(res: Response, data: any = null, message: string = '') {
    return res.json({ data, message });
  }

  static created(res: Response, message: string) {
    return res.status(201).json({ message });
  }

  static notFound(res: Response) {
    return res.sendStatus(404);
  }

  static badRequest(res: Response, message: string) {
    return res.status(400).json({ message });
  }
}
