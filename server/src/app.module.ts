import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DataModule } from './data/data.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    DataModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.MONGO_KEY),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
