import { Body, Controller, Get, Post, Render, Request, Response, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import initEnv from 'etc/secrets/initEnv';
import { AuthenticatorGuard } from './guard/AuthGuard.guard';
import express from 'express';
import { WalletTypesAddress } from './types/WalletAddress.types';
import { ChangePassword } from './types/ChangePassword.types';
import { DepositType } from './types/deposit.types';
import { Withdrawal } from './types/Withdrawal.types';
initEnv();


@Controller('/dashboard')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @UseGuards(AuthenticatorGuard)
  @Render('cpanel/dashboard')
  async dashboard(@Request() req: any){
    const firstName = req.session.user.firstName;
    const lastName = req.session.user.lastName;
    const user = await this.accountService.fetchUser(req.session.user._id);
    const allUser = await this.accountService.fetchAllUser();
    return {title: ` Account Manager || ${process.env.APP_NAME}`, firstName, user, allUser}
  }


  @Get('users')
  @Render('cpanel/userManagement')
  @UseGuards(AuthenticatorGuard)
  userManagement(){
    return {title: `Users Listing | ${process.env.APP_NAME}`}
  }

  @Get('confirm-deposit')
  @UseGuards(AuthenticatorGuard)
  @Render('cpanel/confirm-deposit')
  getPendingDeposit() {
    return {title: `Pending Deposit | ${process.env.APP_NAME}`};
  }

  @Get('confirm-withdrawal')
  @UseGuards(AuthenticatorGuard)
  @Render('cpanel/confirm-withdrawal')
  getWithdrawal() {
    return {title: `Pending Withdrawal | ${process.env.APP_NAME}`};
  }

  @Post('confirm-deposit')
  pendingDepositForm(@Request() req: any) {
    
  }

  @Get('products')
  @Render('cpanel/productManagement')
  @UseGuards(AuthenticatorGuard)
  productsManagement(){
    return {title: `Product Management | ${process.env.APP_NAME}`}
  }

  @Get('top-up')
  @Render('cpanel/topUpAccount')
  topUpAccount(){
    return {title: `Deposit or Top-up | ${process.env.APP_NAME}`}
  }

  @Get('confirm-purchase')
  @Render('cpanel/confirm-purchase')
  confirmProductPurchase(){
    return {title: `BTC Mining Machine Confirmation | ${process.env.APP_NAME}`}

  }
  @Post('top-up')
  public async depositForm(@Body() payload: DepositType, @Request() req: any, @Response() res: express.Response){
    payload._id = req.session.user?._id;
    await this.accountService.depositForm(payload);
    res.redirect('success')
  }

  @Get('add-wallet-address')
  @UseGuards(AuthenticatorGuard)
  @Render('cpanel/add-wallet-address')
  addWalletAddress(){
    return {title: 'Add Wallet Address'+ ' | ' + `${process.env.APP_NAME}`}
  }

  @Post('add-wallet-address')
  @UseGuards(AuthenticatorGuard)
  async addWalletAddressForm(@Body() body : WalletTypesAddress, @Request() req: any, @Response() res: express.Response){
    body._id = req.session.user?._id;
    await this.accountService.addWalletAddress(body);
    res.redirect('success')
  }

  @Get('success')
  @Render('cpanel/success')
  @UseGuards(AuthenticatorGuard)
  successPage(){
    return {msg: 'Successfully!', title: 'Successfully Added'}
  }

  @Get('transactions')
  @UseGuards(AuthenticatorGuard)
  @Render('cpanel/transactionManagement')
  transactionManagement(){
    return {title: `Transaction Management | ${process.env.APP_NAME}`}
  }

  @Get('settings')
  @UseGuards(AuthenticatorGuard)
  @Render('cpanel/settingsMgt')
  settingsMgt(){
    return {title: `Settings Management | ${process.env.APP_NAME}`}
  }

  @Post('settings')
  @UseGuards(AuthenticatorGuard)
  public async changePasswordForm(@Body() body: ChangePassword,  @Request() req: any, @Response() res: express.Response){
    body._id = req.session.user?._id;
    await this.accountService.changePassword(body);
    res.redirect('success')
  }

  @Get('withdrawal-form')
  @Render('cpanel/withdrawal-form')
  @UseGuards(AuthenticatorGuard)
  public async withdrawalForm(){
    return {title: `Transaction Management | ${process.env.APP_NAME}`}
  }

  @Post('withdrawal-form')
  @UseGuards(AuthenticatorGuard)
  public async withdrawalLayout(@Body() body: Withdrawal, @Request() req: any, @Response() res: express.Response){
    body._id = req.session?.user?._id;
    await this.accountService.withdrawalForm(body, res);
  }
  
  

}



