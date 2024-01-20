import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/account.schema";


@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [AccountController],
    providers: [AccountService],
    exports: [AccountService]
  })
export class AccountModule {}
  