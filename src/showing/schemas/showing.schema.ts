import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Model } from "mongoose";

export type ShowingDocument = Showing & Document;

@Schema()
export class Showing {
    @Prop({ required:false, default: 0 })
    listing: string;

    @Prop({ required:true })
    userId: string;

    @Prop({ required:true })
    name: string;

    @Prop({ required:true })
    address: string;

    @Prop({ required:true })
    code: string;

    @Prop({ required:true })
    lat: string;

    @Prop({ required:true })
    lng: string;

    @Prop({required:true })
    price: string;

    @Prop({required:false })
    unit: string;

    @Prop({ required:false, default: Date.now() })
    createdDate: Date
}

export const ShowingSchema = SchemaFactory.createForClass(Showing)
