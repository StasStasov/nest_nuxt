import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'
import { CreateDataDto } from './dto/CreateDataDto'
import { Data, DataDocument } from './schemas/data.schema'

@Injectable()
export class DataService {
  constructor(@InjectModel(Data.name) private dataModel: Model<DataDocument>) {}

  async getOne(id: ObjectId): Promise<Data> {
    const data = await this.dataModel.findById(id)
    return data
  }

  async getAll(): Promise<Data[]> {
    const data = await this.dataModel.find()
    return data
  }

  async create(dto: CreateDataDto): Promise<Data> {
    const data = await this.dataModel.create({ ...dto })
    return data
  }

  async update(id: ObjectId, dto: CreateDataDto): Promise<Data> {
    const data = await this.dataModel.findByIdAndUpdate(
      id,
      { ...dto },
      { useFindAndModify: false, new: true },
    )
    return data
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const data = await this.dataModel.findByIdAndDelete(id)
    return data._id
  }
}
