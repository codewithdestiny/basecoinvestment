import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import initEnv from 'etc/secrets/initEnv';
initEnv();

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root(){
    return {title: ' Home || BaseCoinvestment Profitable Cryptocurrency mining '}
  }

  @Get('about')
  @Render('about')
  legal(){
    return {title: `About Page || ${process.env.APP_NAME}`}
  }
}
