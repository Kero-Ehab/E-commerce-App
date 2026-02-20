import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get('findAll')
  findAll(
    @Query('pageNumber', ParseIntPipe) pageNumber:number,
    @Query('reviewPerPage', ParseIntPipe) reviewPerPage:number
  ) {
    return this.categoryService.findAll(pageNumber, reviewPerPage);
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
