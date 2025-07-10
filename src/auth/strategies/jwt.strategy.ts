import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

function cookieExtractor(req: any): string | null {
  return req?.cookies?.auth_token || null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
        jwtFromRequest: ExtractJwt.fromExtractors([
          ExtractJwt.fromAuthHeaderAsBearerToken(),
          cookieExtractor,
        ]),
        ignoreExpiration: false,
        secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, rol: payload.rol };
    }
} 