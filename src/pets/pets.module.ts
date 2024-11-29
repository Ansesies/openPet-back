import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './entities/pet.entity';

@Module({
  controllers: [PetsController],
  providers: [PetsService],
  imports: [
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }]),
  ],
  exports: [MongooseModule]
})
export class PetsModule {}
