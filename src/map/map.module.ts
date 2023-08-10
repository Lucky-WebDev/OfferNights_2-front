import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MapSchema } from './schemas/map.schema';
import { JwtModule } from '@nestjs/jwt';
import { Handler } from './utils/handler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Map', schema: MapSchema }]),
    JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '3h' },
    }),
    MapModule
  ],
  controllers: [MapController],
  providers: [MapService, Handler],
  exports: [MapService]
})
export class MapModule {
}
