import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
    versionKey: false
})

export class Category {

    @Prop({
        type: String,
        required:true,
        min:[3,'Name Must be at least 3 characters'],
        max:[30,'Name Must be at most 30 characters']
    })
    name: string;
    
    @Prop({
        type: String,
        required:false,
    })
    image: string;

}
export const CategorySchema = SchemaFactory.createForClass(Category)

