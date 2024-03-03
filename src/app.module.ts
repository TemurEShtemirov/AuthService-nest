import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config], // Load the configuration from the config file
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      inject: [ConfigService], // Inject ConfigService to fetch configuration
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres', // Specify the dialect for PostgreSQL
        host: configService.get('config.database.host'),
        port: configService.get<number>('config.database.port'),
        username: configService.get('config.database.username'),
        password: configService.get('config.database.password'),
        database: configService.get('config.database.database'),
        autoLoadModels: true, // Automatically load models from the defined path
        synchronize: true, // Automatically synchronize models with the database (for development only)
      }),
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
