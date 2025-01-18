import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BaseService } from '../base/BaseService';
import UserModel from './user.model';
import { IUser } from './interfaces/IUser';

export class UserService extends BaseService<IUser> {
  private readonly jwtSecret: string;

  constructor() {
    super(UserModel);
    this.jwtSecret = process.env.SECRET || '12wrty56yu';
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hashSync(password, 10);
  }

  private generateToken(userId: string): string {
    return jwt.sign({ sub: userId }, this.jwtSecret, { expiresIn: '1d' });
  }

  async login(credentials: { email: string; password: string }) {
    const user = await this.model.findOne({ email: credentials.email });
    if (user && bcrypt.compareSync(credentials.password, user.hash ?? '')) {
      const token = this.generateToken(user.id);
      return { ...user.toJSON(), token };
    }
    return null;
  }

  async create(userParam: IUser): Promise<IUser> {
    await this.validateUniqueEmail(userParam.email);
    if (userParam.password) {
      userParam.hash = await this.hashPassword(userParam.password);
    }
    return super.create(userParam);
  }

  async update(id: string, userParam: IUser): Promise<IUser | null> {
    const user = await this.findById(id);
    if (!user) throw new Error('User not found');

    if (user.email !== userParam.email) {
      await this.validateUniqueEmail(userParam.email);
    }

    if (userParam.password) {
      userParam.hash = await this.hashPassword(userParam.password);
    }

    return super.update(id, userParam);
  }

  private async validateUniqueEmail(email: string) {
    if (await this.model.findOne({ email })) {
      throw new Error(`Email "${email}" is already taken`);
    }
  }
}

export const userService = new UserService();
