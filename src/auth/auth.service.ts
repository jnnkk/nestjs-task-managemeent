import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
    ) {} // JwtService를 주입받는다.
    
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return User.createUser(authCredentialsDto);
    }

    async signIn(
        authCredentialsDto: AuthCredentialsDto
    ): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await User.findOne({ 
            where: { username }, 
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload); // 토큰을 생성한다.
            return { accessToken }; // 토큰을 반환한다.
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
