import { BadGatewayException, HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
   ){}

  async signIn(email: string, password: string): Promise<{accessToken: string}> {

    try {
      const user = await this.userService.findOne(email);
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if( !isPasswordValid ){
        throw new HttpException('Please check your credentials', HttpStatus.UNAUTHORIZED);
      }

      const payload = {email: user.email, sub: user._id};
      //const accessToken = this.jwtService.sign(payload);

      return {
        accessToken: await this.jwtService.signAsync(payload),
      };

    } catch (error) {
      this.handleExceptions(error);
    }
  }



  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private handleExceptions( error: any ){
    if( error.code === 11000 ){
      throw new BadGatewayException(`User with this email exist in db ${ JSON.stringify( error.keyValue )}`);
    }

    console.log(error);
    throw new InternalServerErrorException(`Can't create User - Check server logs`);
  }
}
