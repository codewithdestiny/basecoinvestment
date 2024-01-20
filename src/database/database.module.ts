import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import initEnv from "etc/secrets/initEnv";
initEnv();

@Module({
    imports: [MongooseModule.forRoot(`${process.env.DB_URL}`)],
    controllers: []
})

export class DatabaseModule {};