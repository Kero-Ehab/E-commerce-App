import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

@Schema({timestamps:true})
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
    @Prop({
        required: true,
        select:false
    })
    password:string;
    @Prop({
        required: false,
        unique: true,
        trim:true,
    })
    phoneNumber:string;
    @Prop()
    age?:number;    

    @Prop({
        type: String,
        required: false,
        default: null
    })
    profileImage: string | null

    @Prop()
    opt:string;

    @Prop()
    expiresAt:Date

}

export const UserSchema = SchemaFactory.createForClass(User);