// import { Controller, Post, Body } from '@nestjs/common';
// import { RegisterDto } from './register.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   async register(@Body() registerDto: RegisterDto) {
//     return this.authService.register(registerDto);
//   }

//   @Post('login')
//   async login(
//     @Body('email') email: string,
//     @Body('password') password: string,
//   ) {
//     return this.authService.login(email, password);
//   }
// }

// import { Controller, Post, Body } from '@nestjs/common';
// import {
//   ClientProxy,
//   ClientProxyFactory,
//   Transport,
// } from '@nestjs/microservices';
// import { RegisterDto } from './register.dto';
// import { LoginDto } from './login.dto';

// @Controller('auth')
// export class AuthController {
//   private authServiceClient: ClientProxy;

//   constructor() {
//     this.authServiceClient = ClientProxyFactory.create({
//       transport: Transport.TCP,
//       options: {
//         host: 'localhost',
//         port: 3001, // Assuming the port number of the auth microservice
//       },
//     });
//   }

//   @Post('register')
//   async register(@Body() registerDto: RegisterDto) {
//     return this.authServiceClient.send('register', registerDto)  //.toPromise();
//   }

//   @Post('login')
//   async login(@Body() loginDto: LoginDto) {
//     return this.authServiceClient.send('login', loginDto)  //.toPromise();
//   }
// }

import { Controller, Post, Body } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  private authServiceClient: ClientProxy;

  constructor() {
    this.authServiceClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    });
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authServiceClient.send('register', registerDto).toPromise();
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authServiceClient.send('login', loginDto);
    
  }
}
