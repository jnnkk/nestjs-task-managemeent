import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { 
        message : 'Password is too week (at least 1 uppercase, 1 lowercase, 1 number or special character)'
    }) // regex for password strength (at least 1 uppercase, 1 lowercase, 1 number or special character)
    password: string;
}