import { HttpException, Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';
import { isEmpty } from 'class-validator';
import { Types } from 'mongoose';


@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ){}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModel.findOne({
      name: createCategoryDto.name
    })
    if(category){
      throw new HttpException('Category already exist', 400);
    }
    const newCategory = await this.categoryModel.create(createCategoryDto)

    return {
      status: 200,
      message: 'Catefgory Created Successfully',
      data: newCategory
    };
  }

  async findAll(pageNumber?:number, reviewPerPage?:number) {
    if (pageNumber && reviewPerPage) {
            return await this.categoryModel
                .find({})
                .skip(reviewPerPage * (pageNumber - 1))
                .limit(reviewPerPage)
                .select('-password');
                
            }
    const category = await this.categoryModel.find()
    return {
      status:200,
      message:'Categories Found',
      length: category.length,
      isEmpty: category.length > 0 ? false : true,
      date: category
    }
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id');
    }
    const category = await this.categoryModel.findById(id)
    if(!category){
      console.log("hi")
      throw new NotFoundException('Category not found')
    }
    return {
      status: 200,
      message: 'Category found',
      data: category,
    };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    if(!Types.ObjectId.isValid(id)){
      throw new BadRequestException('Invalid user id');
    }
    if(Object.keys(updateCategoryDto).length ===0){
      throw new BadRequestException('No data provided for update');
    }

    const updateCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {new: true})


    return {
      status:200,
      message:'Categories Found',
      date: updateCategory
    }
  }

  async delete(id: string) {
    if(!Types.ObjectId.isValid(id)){
      throw new BadRequestException('Invalid user id');
    }
    const category =  await this.categoryModel.findByIdAndDelete(id);
        if(!category){
            throw new NotFoundException("category not found");
        }

      return {message:"category deleted successfully "}
  }
}
