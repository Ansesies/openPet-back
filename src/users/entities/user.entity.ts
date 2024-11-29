import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Pet } from "src/pets/entities/pet.entity";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({required: true })
    name: string;

    @Prop({required: true, unique: true })
    email: string;

    @Prop({required: true })
    password: string;

    @Prop()
    phone: string;

    @Prop({ type: [{ type: String, ref: Pet.name }] }) // Referencias a las mascotas
    pets: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
