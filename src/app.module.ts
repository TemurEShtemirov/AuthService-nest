// import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import config from './config';
// import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       load: [config],
//     }),
//     SequelizeModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         dialect: 'postgres',
//         host: configService.get('config.database.host'),
//         port: parseInt(configService.get('config.database.port'), 10),
//         username: configService.get('config.database.username'),
//         password: configService.get('config.database.password'),
//         database: configService.get('config.database.database'),
//         autoLoadModels: true,
//         synchronize: true,
//       }),
//     }),
//     AuthModule,
//     UserModule,
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module'; // AuthModule ni import qilishni o'chiramiz

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('config.database.host'),
        port: parseInt(configService.get('config.database.port'), 10),
        username: configService.get('config.database.username'),
        password: configService.get('config.database.password'),
        database: configService.get('config.database.database'),
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    // AuthModule,
    UserModule,
  ],
})
export class AppModule {}
