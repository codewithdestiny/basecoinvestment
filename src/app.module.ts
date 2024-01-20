import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, AccountModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
