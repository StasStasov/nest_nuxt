import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ObjectId } from 'mongoose'
import { DataService } from './data.service'
import { CreateDataDto } from './dto/CreateDataDto'

@Controller('/data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.dataService.getOne(id)
  }

  @Get()
  getAll() {
    return this.dataService.getAll()
  }

  @Post()
  create(@Body() dto: CreateDataDto) {
    return this.dataService.create(dto)
  }

  @Put(':id')
  update(@Param('id') id: ObjectId, @Body() dto: CreateDataDto) {
    return this.dataService.update(id, dto)
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.dataService.delete(id)
  }
}
