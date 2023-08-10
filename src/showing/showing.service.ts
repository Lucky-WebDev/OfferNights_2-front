import { Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Handler } from './utils/handler';
import { Showing, ShowingDocument } from './schemas/showing.schema';

@Injectable()
export class ShowingService {

  constructor(@InjectModel(Showing.name) private showingModel: Model<ShowingDocument>, private readonly Handler: Handler, private readonly jwtService: JwtService) { }
  
  async getOne(email): Promise<Showing> {
    return await this.showingModel.findOne({ email }).exec();
  }

  async getMyActiveShowing(id: string): Promise<any> {
    let myActiveShowing = await this.showingModel.find({userId: id}).exec();
    if(myActiveShowing) {
      return myActiveShowing
    } else {
      return []
    }
  }

  async getAllActiveShowing(): Promise<any> {
    let allActiveShowing = await this.showingModel.find().exec();
    if(allActiveShowing) {
      return allActiveShowing
    } else {
      return []
    }
  }

  async addActiveShowing(activeShowing: any): Promise<any> {
    const reqBody = {
      userId: activeShowing.userId,
      name: activeShowing.name,
      address: activeShowing.address,
      code: activeShowing.code,
      lat: activeShowing.lat,
      lng: activeShowing.lng,
      price: activeShowing.price,
      unit: activeShowing.unit
    }

    const newActiveShowing = new this.showingModel(reqBody);
    await newActiveShowing.save();
    
    let myActiveShowings = await this.showingModel.find({
      userId: activeShowing.userId
    }).exec();
    return myActiveShowings;
  }

  async getActiveArea(id: string): Promise<any> {
    let allActiveArea = await this.showingModel.findOne({userId: id}).exec();
    if(allActiveArea) {
      return allActiveArea.location
    } else {
      return []
    }
  }

  async getAllAgents(): Promise<any> {
    let allAgents = await this.showingModel.find().exec();
    if(allAgents) {
      return allAgents
    } else {
      return []
    }
  }
}
