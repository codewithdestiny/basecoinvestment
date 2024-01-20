import { IsOptional, IsString } from "class-validator";

export class WalletTypesAddress {

    @IsOptional()
    _id: String;

    @IsString()
    usdtAddress: String;

    @IsString()
    btcAddress: String;

    @IsString()
    ethAddress: String;

    @IsString()
    solAddress: String
}