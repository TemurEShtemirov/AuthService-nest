// import { Controller, Post, Body } from '@nestjs/common';
// import { UserService } from './user.service';

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Post('register')
//   async register(
//     @Body() body: { fullName: string; email: string; password: string },
//   ) {
//     const { fullName, email, password } = body;
//     return this.userService.createUser(fullName, email, password);
//   }
// }

import { Controller, Post, Body } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { UserRegisterDto } from './user-register.dto';

@Controller('user')
export class UserController {
  private userServiceClient: ClientProxy;

  constructor() {
    this.userServiceClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3002,
      },
    });
  }

  @Post('register')
  async register(@Body() registerDto: UserRegisterDto) {
    return this.userServiceClient.send('register', registerDto) 
  }
}
