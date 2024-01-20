import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return User.createUser(authCredentialsDto);
    }
}
