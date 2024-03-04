// import { Controller, Post, Body, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth/auth.service';
// import { LocalAuthGuard } from './auth/local-auth.guard';
// import { RegisterDto } from './auth/register.dto';
// import { LoginDto } from './auth/login.dto'; // Import the LoginDto

// @Controller()
// export class AppController {
//   constructor(private readonly authService: AuthService) {}

//   @UseGuards(LocalAuthGuard)
//   @Post('auth/login')
//   async login(@Body() loginDto: LoginDto) {
//     return this.authService.login(loginDto);
//   }

//   @Post('auth/register')
//   async register(@Body() registerDto: RegisterDto) {
//   }
// }

import { Controller, Post, Body } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RegisterDto } from './auth/register.dto';
import { LoginDto } from './auth/login.dto';

@Controller()
export class AppController {
  private authServiceClient: ClientProxy;

  constructor() {
    this.authServiceClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001, // Assuming the port number of the auth microservice
      },
    });
  }

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authServiceClient.send('login', loginDto);
  }

  @Post('auth/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authServiceClient.send('register', registerDto);
  }
}
