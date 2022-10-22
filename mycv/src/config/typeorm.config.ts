import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService){}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {

            type: 'sqlite',
            synchronize: process.env.NODE_ENV === 'test',
            database: this.configService.get<string>('DB_NAME'),
            autoLoadEntities: true,
            migrationsRun: process.env.NODE_ENV === 'test' // didn't work
            // entities: ['**/*.entity.js'],
        }
    }
    
}