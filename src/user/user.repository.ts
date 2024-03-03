import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(
    fullName: string,
    email: string,
    password: string,
  ): Promise<User> {
    return await this.userModel.create({ fullName, email, password });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ where: { email } });
  }
}
