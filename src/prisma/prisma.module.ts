import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
// by adding @Global here we dont need to import PrismaService in every module that needs it.
@Global()

@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}