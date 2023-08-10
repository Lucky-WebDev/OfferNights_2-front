import { Controller, HttpCode, UseGuards, Request, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete, Req } from '@nestjs/common';
import { ShowingService } from './showing.service';
import { AuthGuard } from './showing.guard';
import { Showing } from './schemas/showing.schema';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { JwtService } from '@nestjs/jwt';
import { Handler } from './utils/handler';
import { validateAsync} from 'parameter-validator';


@Controller('showing')
export class ShowingController {

  constructor(private showingService: ShowingService, private jwtService: JwtService, private Handler: Handler) { }

  // add active showing agent
  @UseGuards(AuthGuard)
  @Post('/add-active-showing')
  async addLocations(@Res() response, @Body() activeShowing: any) {
    try {
      const newActiveShowing = await this.showingService.addActiveShowing(activeShowing);
      let result = this.Handler.success(response, newActiveShowing);
      return result
    }
    catch (error) {
        return this.Handler.errorException(response, error);
    }
  }

  // Get my active showings agent
  @Get('get-my-active-showing/:id')
  async getMyActiveShowing(@Param('id') id: string, @Res() response, @Req() req) {
    try {
      const myActiveShowing = await this.showingService.getMyActiveShowing(id);
      let result = this.Handler.success(response, myActiveShowing);
      return result
    }
    catch (error) {
        return this.Handler.errorException(response, error);
    }
  }

  // Get all active showings
  @Get('get-all-active-showing')
  async getAllActiveShowing(@Res() response, @Req() req) {
    try {
      const allActiveShowing = await this.showingService.getAllActiveShowing();
      let result = this.Handler.success(response, allActiveShowing);
      return result
    }
    catch (error) {
        return this.Handler.errorException(response, error);
    }
  }

  // Get subscriber by id
  @Get('get-active-area/:id')
  async getSubscriberType(@Param('id') id: string, @Res() response, @Req() req) {
    try {
      const newLocations = await this.showingService.getActiveArea(id);
      let result = this.Handler.success(response, newLocations);
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
      const allAgents = await this.showingService.getAllAgents();
      let result = this.Handler.success(response, allAgents);
      return result
    }
    catch (error) {
        return this.Handler.errorException(response, error);
    }
  }
}
