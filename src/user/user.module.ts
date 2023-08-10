import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { Handler } from './utils/handler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '100h' },
    }),
    UserModule
  ],
  controllers: [UserController],
  providers: [UserService, Handler],
  exports: [UserService]
})
export class UserModule {
}
