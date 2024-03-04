// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { User } from './user.model';

// @Injectable()
// export class UserRepository {
//   constructor(
//     @InjectModel(User)
//     private userModel: typeof User,
//   ) {}

//   async createUser(
//     fullName: string,
//     email: string,
//     password: string,
//   ): Promise<User> {
//     return await this.userModel.create({ fullName, email, password });
//   }

//   async findByEmail(email: string): Promise<User> {
//     return await this.userModel.findOne({ where: { email } });
//   }
// }
import { Injectable } from '@nestjs/common';
import { RequestContext } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';



// Import the UserModel
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User) // Inject the UserModel
    private readonly userModel: typeof User,
  ) {}

  async createUser(
    fullName: string,
    email: string,
    password: string,
    ctx: RequestContext,
  ): Promise<User> {
    return await this.userModel.create({
      fullName,
      email,
      password,
      ctx,
    });
  }

  async findByEmail(email: string, ctx: RequestContext): Promise<User> {
    return await this.userModel.findOne({
      where: {
        email,
        ctx,
      },
    });
  }
}
