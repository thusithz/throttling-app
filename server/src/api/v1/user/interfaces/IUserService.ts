export interface IUserService {
  login(credentials: { email: string; password: string }): Promise<any>;
  getById(id: string): Promise<any>;
  create(userParam: any): Promise<void>;
  update(id: string, userParam: any): Promise<void>;
  delete(id: string): Promise<void>;
}
