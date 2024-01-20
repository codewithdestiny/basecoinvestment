import { IsString } from "class-validator";

export class ChangePassword {

    @IsString()
    _id: any
    
    @IsString()
    currentPassword: String;

    @IsString()
    newPassword: String
}