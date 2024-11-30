import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pet, PetDocument } from './entities/pet.entity';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectModel(Pet.name) private petModel: Model<PetDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createPetDto: CreatePetDto, userId: string): Promise<Pet> {
    const createdPet = new this.petModel({ ...createPetDto, owner: userId });
    await createdPet.save(); 

    await this.userModel.findByIdAndUpdate(userId, {
      $push: { pets: createdPet._id },
    });
    return createdPet;
  }

  findAll() {
    return `This action returns all pets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
