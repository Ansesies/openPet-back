import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength,   } from "class-validator";

export class CreateUserDto {

    @IsString()
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @MinLength(6)
    readonly password: string;

    @IsOptional()
    @IsString()
    readonly phone?: string;

    @IsOptional()
    readonly pets?: string[];

}
