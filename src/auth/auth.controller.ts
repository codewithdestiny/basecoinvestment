import { Body, Controller, Get, Post, Render, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpTypes } from './dto/SignUp.types';
import express from 'express';
import * as bcrypt from 'bcryptjs';
import { SignInTypes } from './dto/SignIn.types';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService) {}

  @Get('sign-up')
  @Render('auth/registerUser')
  signUp(){
    return {title: ' Register || BaseCoinvestment'}
  }

  @Post('sign-up-form')
  public async signUpForm(@Body() payload: SignUpTypes, @Response() res: express.Response) {
    payload.password = bcrypt.hashSync(payload.password.trim(), bcrypt.genSaltSync())
    const response = await this.authService.create(payload)
    return res.redirect('sign-in')
  }


  @Get('sign-in')
  @Render('auth/loginUser')
  signIn(){
    return {title: ' Login || BaseCoinvestment'}
  }

  @Post('sign-in')
  async signInForm(@Body() request: SignInTypes, @Request() req: any, @Response() res: express.Response){
    const response = await this.authService.login(request.email, request.password, req)
    req.session.user = response;
    req.session.save();
    res.redirect('../dashboard')
  }

  @Get('password/reset')
  @Render('auth/resetPasswordRequest')
  resetPasswordRequest(){
    return {title: ' Reset Password Request || BaseCoinvestment'}
  }


  @Get('logout')
  @Render('auth/loginUser')
  logout(@Request() res: express.Request) {
    res.session.destroy(() => {
      console.log('session destroyed')
      return {message: 'Session Expired! LogIn to Continue'}
    });
    
  }

}



