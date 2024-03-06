import { Body, Controller, HttpCode, HttpStatus, ParseIntPipe, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // the end point be like: /auth/signup
  @Post('signup')
  signup(@Body() dto:AuthDto) 
  
   {
   
    return this.authService.signup(dto);
  }
  // the end point be like: /auth/signin

  // httpCode give us the status code of the response.
  //Ok means 200/ so we are setting status code of 200 here.
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto:AuthDto) {
    return this.authService.signin(dto);
  }
}
