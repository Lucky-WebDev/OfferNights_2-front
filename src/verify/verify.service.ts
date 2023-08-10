import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as gravatar from 'gravatar';
import { Handler } from './utils/handler';
import { User, UserDocument } from './schemas/verify.schema';
const nodemailer = require('nodemailer');
import { EmailAddress, EmailPassword } from './utils/secret';
import jwt from 'jsonwebtoken';
import { Twilio } from 'twilio';

@Injectable()
export class VerifyService {
  private twilioClient: Twilio

  // private transporter: nodemailer.Transporter;

  constructor(@InjectModel(User.name) private readonly Handler: Handler, private readonly jwtService: JwtService, private readonly configService: ConfigService) { 
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async verify(email): Promise<any> {
    let token = await this.jwtService.sign(email, {
      secret: "secret",
      expiresIn: "10m"
    })

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "smiledev10162@gmail.com",
          pass: "kzdyvdevtkhlkjuy",
        },
      });
  
      await transporter.sendMail({
        from: 'smiledev10162@gmail.com',
        to: email.email,
        subject: "OfferNights",
        text: token,
      });
      console.log("email sent sucessfully");
      return { 'token': token }
    } catch (error) {
      console.log("email not sent");
      return { 'error': error }
    }
  }

  async check(token) {
    try {
      const payload = await this.jwtService.verify(token.token, {
        secret: "secret"
      })

      if (typeof payload === 'object' && 'email' in payload) {
        return { 'email': payload.email };
      }
      return { 'error': 'failure' };
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        return { 'error': 'failure' };
      }
      return { 'error': 'failure' };
    }
  }

  async generateRandomNumber(min: number, max: number): Promise<number> {
    // Generate a random decimal between 0 and 1
    const randomDecimal = Math.random();
  
    // Scale the random decimal to the desired range
    const randomNumber = await Math.floor(randomDecimal * (max - min + 1)) + min;
  
    return randomNumber;
  }

  async sendOtp(phoneNumber: string) {
    const serviceSid = this.configService.get(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );
    let msg = '';
    await this.twilioClient.verify.v2
      .services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' })
      .then((verification) => (msg = verification.status));
    return { msg: msg };
  }

  async verifyOtp(phoneNumber: string, code: string) {
    const serviceSid = this.configService.get(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );
    let msg = '';
    await this.twilioClient.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code: code })
      .then((verification) => (msg = verification.status));
    return { msg: msg };
  }
}
