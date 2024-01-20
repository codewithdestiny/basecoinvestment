import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class SignUpTypes {
    @IsEmail()
    email: String

    @IsString()
    firstName: String

    @IsString()
    lastName: String
    
    @IsStrongPassword({minLength: 5})
    password: String
}