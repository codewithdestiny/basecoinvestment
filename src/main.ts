import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session';
import initEnv from 'etc/secrets/initEnv';
import MongoStore = require('connect-mongo');
import Handlebars = require('handlebars');
initEnv();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));

  app.use(cookieParser())

  app.use(session({
    secret: `${process.env.SESSION_SECRET}`,
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({mongoUrl: `${process.env.DB_URL}`, ttl: 30 * 24 * 60 * 60, autoRemove: 'interval', autoRemoveInterval: 10, touchAfter: 24 * 3600}),
    
  }))

  Handlebars.registerHelper("if", function(conditional, options) {
    if(conditional){
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })

  Handlebars.registerHelper("each", function(context, options) {
    var ret = "";
    for (var i = 0, j = context.length; i < j; i++) {
      ret = ret + options.fn(context[i]);
    }
    return ret;
  });

  app.setViewEngine('hbs');
  await app.listen(3000);
}

bootstrap();
