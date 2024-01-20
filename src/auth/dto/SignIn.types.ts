import { IsEmail, IsStrongPassword } from "class-validator";

export class SignInTypes {
    @IsEmail()
    email: String

    @IsStrongPassword({minLength: 5})
    password: String
}