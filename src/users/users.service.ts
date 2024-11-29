import { BadGatewayException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}


  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
  
      const existingUser = await this.userModel.findOne({ email: createUserDto.email });
      if (existingUser) {
        throw new HttpException('Email is already in use', HttpStatus.BAD_REQUEST);
      }
  
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
  
      const newUser = new this.userModel({
        ...createUserDto, 
        password: hashedPassword, 
      });
  
      return await newUser.save();
    } catch (error) {
      // Manejar errores y log para depuración
      this.handleExceptions(error);
    }
  }

  async loginUser(email: string, password: string){
    try {
      const user = await this.userModel.findOne({email});
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if( !isPasswordValid ){
        throw new HttpException('Please check your credentials', HttpStatus.UNAUTHORIZED);
      }

      if( user && isPasswordValid) {
        const {email, name } = user;
        return {email, name}
      }

    } catch (error) {
      this.handleExceptions(error);
    }

  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  private handleExceptions( error: any ){
    if( error.code === 11000 ){
      throw new BadGatewayException(`User with this email exist in db ${ JSON.stringify( error.keyValue )}`);
    }

    console.log(error);
    throw new InternalServerErrorException(`Can't create User - Check server logs`);
  }

}
