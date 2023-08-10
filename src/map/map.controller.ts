import { Controller, HttpCode, UseGuards, Request, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete, Req } from '@nestjs/common';
import { MapService } from './map.service';
import { AuthGuard } from './map.guard';
import { Map } from './schemas/map.schema';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { JwtService } from '@nestjs/jwt';
import { Handler } from './utils/handler';
import { validateAsync} from 'parameter-validator';


@Controller('map')
export class MapController {

  constructor(private mapService: MapService, private jwtService: JwtService, private Handler: Handler) { }

  // add a location
  @UseGuards(AuthGuard)
  @Post('/add-locations/:id')
  async addLocations(@Param('id') id: string, @Res() response, @Body() locations: any) {
    try {
      const newLocations = await this.mapService.addLocations(id, locations);
      let result = this.Handler.success(response, newLocations);
      return result
    }
    catch (error) {
        return this.Handler.errorException(response, error);
    }
  }

  // Get all farming areas
  @Get('get-active-area/:id')
  async getSubscriberType(@Param('id') id: string, @Res() response, @Req() req) {
    try {
      const newLocations = await this.mapService.getActiveArea(id);
      let result = this.Handler.success(response, newLocations);
      return result
    }
    catch (error) {
        return this.Handler.errorException(response, error);
    }
  }

  // Delete a farming area
  @Post('delete-active-area')
  async deleteActiveArea(@Res() response, @Req() req, @Body() data: any) {
    try {
      const allActiveArea = await this.mapService.deleteActiveArea(data);
      let result = this.Handler.success(response, allActiveArea);
      return result
    }
    catch (error) {
        return this.Handler.errorException(response, error);
    }
  }

  // Get all agents
  @Get('get-all-agents')
  async getAllAgents(@Res() response, @Req() req) {
    try {
      const allAgents = await this.mapService.getAllAgents();
      let result = this.Handler.success(response, allAgents);
      return result
    }
    catch (error) {
        return this.Handler.errorException(response, error);
    }
  }
}
