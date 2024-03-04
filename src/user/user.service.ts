// import { Injectable } from '@nestjs/common';
// import { UserRepository } from './user.repository';
// import { User } from './user.model';

// @Injectable()
// export class UserService {
//   constructor(private readonly userRepository: UserRepository) {}

//   async createUser(
//     fullName: string,
//     email: string,
//     password: string,
//   ): Promise<User> {
//     return await this.userRepository.createUser(fullName, email, password);
//   }

//   async findByEmail(email: string): Promise<User> {
//     return await this.userRepository.findByEmail(email);
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { UserRepository } from './user.repository';
// import { User } from './user.model';
// import { UserRegisterDto } from './user-register.dto';

// @Injectable()
// export class UserService {
//   constructor(private readonly userRepository: UserRepository) {}

//   async register(registerDto: UserRegisterDto): Promise<User> {
//     const { fullName, email, password } = registerDto;
//     return await this.userRepository.createUser(fullName, email, password);
//   }

//   async findByEmail(email: string): Promise<User> {
//     return await this.userRepository.findByEmail(email);
//   }
// }

import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { UserRepository } from './user.repository';
import { UserRegisterDto } from './user-register.dto';
import { RequestContext } from '@nestjs/microservices'; // Import RequestContext

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(
    registerDto: UserRegisterDto,
    ctx: RequestContext,
  ): Promise<User> {
    const { fullName, email, password } = registerDto;
    return await this.userRepository.createUser(fullName, email, password, ctx); // Pass RequestContext to the repository method
  }

  async findByEmail(email: string, ctx: RequestContext): Promise<User> {
    return await this.userRepository.findByEmail(email, ctx); // Pass RequestContext to the repository method
  }
}
