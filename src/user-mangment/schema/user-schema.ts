import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop({required: true})
    name:string;
    @Prop({
        required: true,
        unique: true,
        trim:true,
        lowercase:true,
    })
    email:string;
    @Prop({required: true})
    password:string;
    @Prop({
        required: true,
        unique: true,
        trim:true,
    })
    phoneNumber?:string;
    @Prop()
    age?:number;    

    createdAt: Date;
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);