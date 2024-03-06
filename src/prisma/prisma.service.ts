import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
@Injectable()
export class PrismaService extends PrismaClient{
   
    constructor(config: ConfigService){
        
        super({
            datasources: {
                db: {
                    url:config.get('DATABASE_URL')
                }
            }
        })
    }

    cleanDb(){
        // here we use transaction to maintain the sequence deleting so first delete bookmark and then user
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany()
        ])
    }
}
