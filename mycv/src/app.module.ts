import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { APP_PIPE } from '@nestjs/core';
import cookieSession = require('cookie-session');
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeorm.config';
const dbConfig = require('../ormconfig.js');
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // so it is going to be imported in every single module
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    // TypeOrmModule.forRoot(dbConfig),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //         type: 'sqlite',
    //         database: config.get<string>('DB_NAME'),
    //         entities: [User, Report],
    //         synchronize: true,
    //         logging: true
    //       }
    //   }
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true
    // }),
    UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true
      })
    }
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys: [this.configService.get('COOKIE_KEY')]
    })).forRoutes('*')
  }
}
