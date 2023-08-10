import { Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Handler } from './utils/handler';
import { Map, MapDocument } from './schemas/map.schema';
import nodemailer, {createTransport} from "nodemailer";

@Injectable()
export class MapService {

  constructor(@InjectModel(Map.name) private mapModel: Model<MapDocument>, private readonly Handler: Handler, private readonly jwtService: JwtService) { }
  
  async getOne(email): Promise<Map> {
    return await this.mapModel.findOne({ email }).exec();
  }

  async addLocations(id: string, locations: any): Promise<any> {
    console.log(locations)
    const reqBody = {
      ...locations,
      userId: id,
    }
    const newLocation = new this.mapModel(reqBody);
    await newLocation.save();
    
    let myLocations = await this.mapModel.find({userId: id}).exec();
    return myLocations;
  }

  async getActiveArea(id: string): Promise<any> {
    let allActiveArea = await this.mapModel.find({userId: id}).exec();
    if(allActiveArea) {
      return allActiveArea
    } else {
      return []
    }
  }

  async getAllAgents(): Promise<any> {
    let allAgents = await this.mapModel.find().exec();
    if(allAgents) {
      return allAgents
    } else {
      return []
    }
  }

  async deleteActiveArea(data: any): Promise<any> {
    await this.mapModel.findByIdAndDelete(data.id);
    let myLocations = await this.mapModel.find({userId: data.userId}).exec();
    return myLocations;
  }
}
