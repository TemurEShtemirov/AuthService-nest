// import { Controller, Post, Request, Body, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth/auth.service';
// import { LocalAuthGuard } from './auth/local-auth.guard';
// import { RegisterDto } from './auth/register.dto';

// @Controller()
// export class AppController {
//   constructor(private readonly authService: AuthService) {}

//   @UseGuards(LocalAuthGuard)
//   @Post('auth/login')
//   async login(@Request() req: any) {
//     const { email, password } = req.body;
//     return this.authService.login(email, password);
//   }

//   @Post('auth/register')
//   async register(@Body() registerDto: RegisterDto) {
//     return this.authService.register(registerDto);
//   }
// }


import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RegisterDto } from './auth/register.dto';
import { LoginDto } from './auth/login.dto'; // Import the LoginDto

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto); 
  }

  @Post('auth/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
