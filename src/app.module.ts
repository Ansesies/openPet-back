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
    MongooseModule.forRoot('mongodb+srv://renatotapiaarancibia:YORYjdfbNIbPQZAz@cluster0.zc4q1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), AuthModule, PetsModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
