import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }), // PassportModule은 인증을 위한 모듈이다.
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600, // 1시간
      }, 
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule], // JwtStrategy를 다른 모듈에서 사용할 수 있도록 export한다.
})
export class AuthModule {}
