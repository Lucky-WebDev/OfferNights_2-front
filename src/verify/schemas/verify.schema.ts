import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({required:false })
    type: string;

    @Prop({required:true })
    firstName: string;

    @Prop({required:false, default: '' })
    middleName: string

    @Prop({required:true })
    lastName: string

    @Prop({required:false, default: '' })
    tradeName: string

    @Prop({required:false, default: '' })
    avatar: string

    @Prop({required:true })
    cell: string; 

    @Prop({required:true, unique:true })
    email: string

    @Prop({required:true })
    password: string;

    @Prop({required:false, default: ''})
    brokerageName: string;

    @Prop({required:false, default: ''})
    brokerageAddress: string;

    @Prop({required:false, default: ''})
    brokerageCity: string;

    @Prop({required:false, default: ''})
    brokeragePostalCode: string;

    @Prop({required:false, default: ''})
    brokeragePhone: string;

    @Prop({required:false, default: []})
    pictures: [{
        link: string
    }];

    @Prop({required:false})
    termAgree: boolean;

    @Prop({required:false, default: Date.now() })
    createdDate: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
