import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePetDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly type: string; // Ejemplo: perro, gato, etc.
}
