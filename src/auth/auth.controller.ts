import {Controller, Post} from "@nestjs/common"
import { AuthService } from "./auth.service";

@Controller ('auth')
export class AuthController{
    constructor(private authService: AuthService) {}
// the end point be like: /auth/signup
    @Post('signup')
    signup(){
       return this.authService.signup()
        
    }
// the end point be like: /auth/signin
    @Post('signin')
    signin(){
       return this.authService.signin()
    }
}