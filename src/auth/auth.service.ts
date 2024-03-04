import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './register.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { fullName, email, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    return this.userService.createUser({
      fullName,
      email,
      password: hashedPassword,
    });
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password); // Compare hashed password
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password); // Compare hashed password
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { RegisterDto } from './register.dto';
// import { LoginDto } from './login.dto';
// import { UserService } from '../user/user.service';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private jwtService: JwtService,
//     private userService: UserService,
//   ) {}

//   async register(registerDto: RegisterDto): Promise<any> {
//     const { fullName, email, password } = registerDto;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     return this.userService.register({
//       fullName,
//       email,
//       password: hashedPassword,
//     });
//   }

//   async login(loginDto: LoginDto): Promise<any> {
//     const { email, password } = loginDto;
//     const user = await this.userService.findByEmail(email);

//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     const payload = { email: user.email, sub: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }

//   async validateUser(email: string, password: string): Promise<any> {
//     const user = await this.userService.findByEmail(email);

//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       throw new UnauthorizedException('Invalid credentials');
//     }

//     return user;
//   }
// }
