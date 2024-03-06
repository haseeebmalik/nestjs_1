import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';

import { User } from '@prisma/client';

import { GetUser } from '../../src/auth/decorator';
import { JwtGuard } from '../../src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Get('me')

    // here we get user which we pass from decorator/get-user.decorator.ts

    // here we can pass parameter to @GetUser function and we will get that in decorator/get-user.decorator.ts as data
    getMe(@GetUser() user:User) {
        
       
        return user
    }
    @Patch()
    editUser(
      @GetUser('id') userId: number,
      @Body() dto: EditUserDto,
    ) {
      // Your logic here
      return this.userService.editUser(userId, dto);
    }
}
