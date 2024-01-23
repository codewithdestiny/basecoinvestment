import { BadRequestException, HttpStatus, Injectable, Response, UnauthorizedException } from '@nestjs/common';
import { User } from './schema/account.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WalletTypesAddress } from './types/WalletAddress.types';
import { ChangePassword } from './types/ChangePassword.types';
import * as bcrypt from 'bcryptjs';
import { DepositType } from './types/deposit.types';
import { Withdrawal } from './types/Withdrawal.types';
import express from 'express';

@Injectable()
export class AccountService {

  constructor(
    @InjectModel(User.name) private userService : Model<User>  ){}

    public async addWalletAddress (payload: WalletTypesAddress){
      try {
        return await this.userService.findOneAndUpdate({_id: payload._id}, {
          usdtAddress: payload.usdtAddress,
          ethAddrss: payload.ethAddress,
          btcAddress: payload.btcAddress,
          solAddress: payload.solAddress
        }, {new: true})
      } catch (error) {
        throw new BadRequestException({error, status: HttpStatus.BAD_REQUEST})
      }
    }

    public async changePassword(payload: ChangePassword){
      try {

        /**
         * @Search User
         */
        const fetchUser = await this.userService.findOne({_id: payload._id}).exec();
        if(!fetchUser) throw new UnauthorizedException()
        fetchUser.password = bcrypt.hashSync(`${payload.newPassword}`, bcrypt.genSaltSync())
        /**
         * @Save
         */
        await fetchUser.save();
      } catch (error) {
        throw new BadRequestException({error, status: HttpStatus.BAD_REQUEST})
      }
    }

    public async fetchUser(id: any){
      return await this.userService.findOne({_id: id}).exec()
    }

    public async depositForm(payload: DepositType) {

      try {

        let user = await this.userService.findOne({_id: payload._id}).exec()
        user.amountDeposited = parseInt(`${user.amountDeposited}`) +parseInt(`${payload.amount}`);
        user.cryptoDeposited= payload.cryptos;
        user.packagesDeposited= payload.package;
        user.confirmationReceipt= payload.receiptDeposit
        await user.save();
        
      } catch (error) {
        throw new BadRequestException({error, status: HttpStatus.BAD_REQUEST})
      }
    }

    public async withdrawalForm(payload: Withdrawal, @Response() res: express.Response){
      try {
        /**
         * @Check user against insufficient fund
         */
        let fetchUser = await this.userService.findOne({_id: payload._id});
        if(parseInt(`${fetchUser.usdtBal}`) < parseInt(`${payload.amount}`)) throw new BadRequestException({error: true, message: "Insufficient Fund!, Try again"})
        console.log(fetchUser)
        fetchUser.usdtBal = parseInt(`${fetchUser.usdtBal}`) - parseInt(`${payload.amount}`);
        fetchUser.withdrawalAmt = Number(payload.amount);
        fetchUser.usdtAddress = payload.WalletAddress;
        await fetchUser.save();
      } catch (error) {
        throw new BadRequestException({error, status: HttpStatus.BAD_REQUEST})
      }
    }

    public async fetchAllUser() {
      const users =  await this.userService.find({});
      return users;
    }


 

}
