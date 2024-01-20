import { IsNumberString, IsOptional, IsString } from "class-validator";

export class DepositType {

    @IsOptional()
    _id: any 
    
    @IsNumberString()
    amount: any

    @IsString()
    cryptos: String

    @IsString()
    package: String

    @IsString()
    receiptDeposit: String


}