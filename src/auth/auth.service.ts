import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/account/schema/account.schema';
import * as bcrypt from 'bcryptjs';
import express from 'express';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userService : Model<User>,

  ){}

  public async create(data: Object) {
    try {
      return await this.userService.create(data);
    } catch (error) {
      throw new HttpException( "Account already Exist", HttpStatus.BAD_REQUEST, {cause: error})
    }
  }


  public async find(searchValue: Object) : Promise<User | any> {
    try {
      return await this.userService.find(searchValue).exec();
    } catch (error) {
      throw new HttpException( "No Record Found", HttpStatus.BAD_REQUEST, {cause: error})
    }
  }

  public async login(email: String, password: String, req: express.Request) {
    const fetchUser = await this.userService.findOne({email}).exec();
    if(!fetchUser) throw new BadRequestException({error: "Account Not Found!"})

    if(!bcrypt.compareSync(`${password}`, `${fetchUser.password}`)) throw new BadRequestException({error: 'Invalid User Credentials'})

    return fetchUser

  }

  public async update(fiterValue: Object, updateValue: Object) {
    try {
      return await this.userService.findOneAndUpdate(fiterValue, updateValue, {new: true, returnOriginal: false})
    } catch (error) {
      throw new HttpException( "Failed to update value", HttpStatus.BAD_REQUEST, {cause: error})
    }
  }

  public async delete(filter: Object) {
    try {
      return await this.userService.findOneAndDelete(filter, {returnOriginal: true});
    } catch (error) {
      throw new HttpException( "Failed to delete value", HttpStatus.BAD_REQUEST, {cause: error})
    }
  }
}
