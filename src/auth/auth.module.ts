import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User, UserSchema } from "src/account/schema/account.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "./auth.controller";


@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
  })
export class AuthModule {}
  