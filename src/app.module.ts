import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [
    UsersModule, 
    PetsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-openpet'), AuthModule, PetsModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
