import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let user:number | object;
    if(data){
      user= request.user[data];
    }
    else {
     user = request.user;
    }
    return user;
  },
);