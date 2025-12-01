// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './auth.strategy';
import 'dotenv/config';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: (process.env.JWT_SECRET as string),
      signOptions: {
        // cast so TS is happy; jsonwebtoken accepts string like '1h'
        expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as any,
        // or, if you prefer numeric seconds:
        // expiresIn: process.env.JWT_EXPIRES_IN
        //   ? Number(process.env.JWT_EXPIRES_IN)
        //   : 3600,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
