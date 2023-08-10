import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type MapDocument = Map & Document;

@Schema()
export class Map {
    @Prop({required:true })
    userId: string;

    @Prop({required:true })
    type: string;

    @Prop({required:true })
    name: string;

    @Prop({required:true })
    email: string;

    @Prop({required:false })
    cell: string;

    @Prop({required:true })
    address: string;

    @Prop({required:false })
    code: string;

    @Prop({required:false })
    country: string;

    @Prop({required:false })
    state: string;

    @Prop({required:false })
    city: string;

    @Prop({required:false })
    county: string;

    @Prop({required:false })
    region: string;

    @Prop({required:false })
    quarter: string;

    @Prop({required:false })
    village: string;

    @Prop({required:false })
    road: string;

    @Prop({required:false })
    houseNumber: string;

    @Prop({required:true })
    lat: string;

    @Prop({required:true })
    lng: string;

    @Prop({required:false, default: 1 })
    radius: string;

    @Prop({required:false, default: Date.now() })
    createdDate: Date
}

export const MapSchema = SchemaFactory.createForClass(Map)
