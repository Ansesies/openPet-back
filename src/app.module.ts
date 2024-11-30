import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    UsersModule, 
    PetsModule,
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),
    MongooseModule.forRoot(process.env.DB_CNN),
    AuthModule, 
    PetsModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
