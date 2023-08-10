import { Module } from '@nestjs/common';
import { VerifyController } from './verify.controller';
import { VerifyService } from './verify.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/verify.schema';
import { JwtModule } from '@nestjs/jwt';
import { Handler } from './utils/handler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '5h' },
    }),
    VerifyModule
  ],
  controllers: [VerifyController],
  providers: [VerifyService, Handler],
  exports: [VerifyService]
})
export class VerifyModule {
}
