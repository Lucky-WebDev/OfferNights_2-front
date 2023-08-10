import { Module } from '@nestjs/common';
import { ShowingController } from './showing.controller';
import { ShowingService } from './showing.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShowingSchema } from './schemas/showing.schema';
import { JwtModule } from '@nestjs/jwt';
import { Handler } from './utils/handler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Showing', schema: ShowingSchema }]),
    JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '3h' },
    }),
    ShowingModule
  ],
  controllers: [ShowingController],
  providers: [ShowingService, Handler],
  exports: [ShowingService]
})
export class ShowingModule {
}
