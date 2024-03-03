import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(
    fullName: string,
    email: string,
    password: string,
  ): Promise<User> {
    return await this.userRepository.createUser(fullName, email, password);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }
}
