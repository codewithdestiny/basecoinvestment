import { IsNumberString, IsString } from "class-validator";

export class Withdrawal {
    @IsNumberString()
    amount: String

    @IsString()
    _id: any;

    @IsString()
    WalletAddress: String
}