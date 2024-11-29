import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "src/users/entities/user.entity";

export type PetDocument = Pet & Document;

@Schema()
export class Pet {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    type: string;

    @Prop({ type: String, ref: 'User' }) // Usa 'User' como cadena
    owner: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
