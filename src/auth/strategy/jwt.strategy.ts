import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../../../src/prisma/prisma.service';

@Injectable()
// The second parameter here is the name of the strategy.
//This name will be used in the guard in the controllers to guard some route.
// For example we are using it in guard/jwt.guard.ts, and we use that guard in user.controller.ts
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // configService is for using env variables.
  constructor(config:ConfigService,
     private prisma: PrismaService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: {
    sub: number;
    email: string;
  }) {
    // This is the payload we pass into the token as a payload, here we get the actual values
    // We can access that payload and find user in db
    // then we will receive this user in user.controller.ts
    
    
   try{
    const user = await this.prisma.user.findUnique({
              where: {
                id: payload.sub,
                
                
              },
            });
            
            if(user){
              delete user.hash
            }
   
    
    // we will get this user object as request.user in decorator/get-user.decorator.ts
    return user;
          }catch (err){
            console.log(err)
            return {message:'internal server error', status:500}
          }
  }


}


