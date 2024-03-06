import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmarkDto, EditBookmarkDto } from 'src/bookmark/dto';
describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    // we will need below because we have it in main.ts file.
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);

    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => {
    app?.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@test.com',
      password: '123456',
    };
    describe('signup', () => {
      //  it.todo('should pass',);
      it('should throw if email empty', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should signup', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .inspect();
      });
    });
    describe('signin', () => {
      it('should signin', async () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .inspect()
          .stores('accessToken', 'accessToken');
      });
    });
  });
  describe('user', () => {
    describe('Get me', () => {
      it('should get current user', async () => {
        return pactum
          .spec()
          .get('/user/me')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          .expectStatus(200);
      });
    });
    describe('Edit User', () => {
      it('should edit user', async () => {
        const dto: EditUserDto={
          firstName:'haseeeb',
          email:'test@123.com'
        }
        return pactum
          .spec()
          .patch('/user')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });
  describe('Bookmark', () => {
    describe('Get empty bookmarks', () => {
      it('should get empty bookmarks', async () => {
       
        // await pactum
        // .spec()
        // .get('/bookmarks')
        // .withHeaders({
        //   Authorization: `Bearer $S{accessToken}`,
        // })
        // .expectStatus(200)
        // .inspect();
      
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
         
          .expectStatus(200)
          .expectBody([]);
       
      });
    });
    // describe('Create Bookmark', () => {
    //   const dto: CreateBookmarkDto= {
    //     title: 'First Bookmark',
    //     link: 'https://first.com',
    //   }
    //   it('should create bookmark', async () => {
    //     return pactum
    //       .spec()
    //       .post('/bookmarks')
    //       .withHeaders({
    //         Authorization: 'Bearer $S{accessToken}',
    //       })
    //        .withBody(dto)
    //       .expectStatus(201)
          
    //   })
    // });
    describe('Create bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: 'First Bookmark',
        link: 'https://www.youtube.com/watch?v=d6WC5n9G_sM',
      };
      it('should create bookmark', () => {
        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          .withBody(dto)
          .expectStatus(201)
          .inspect()
          .stores('bookmarkId', 'id');
      });
    });
    describe('Get Bookmarks', () => {
      it('should get bookmarks', async () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          .inspect()
          .expectJsonLength(1)
    })
  });
    describe('Get Bookmark by Id', () => {
      it('should get bookmark by id', async () => {
        return pactum
          .spec()
          .get('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          
          
          .expectStatus(200)
          .expectBodyContains('$S{bookmarkId}')
          .inspect()
    })
    });
    describe('Edit Bookmark by Id', () => {
      const dto: EditBookmarkDto={
        title: "Kubernetes Course",
        description: "Learn how to use kubernetes to  scale your app."
      }
      it('should edit bookmark by id', async () => {
        return pactum
          .spec()
          .patch('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.description)
          
          
          .inspect()
    })
    });
    describe('Delete Bookmark by Id', () => {
      it('should delete bookmark by id', async () => {
        return pactum
          .spec()
          .delete('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withHeaders({
            Authorization: 'Bearer $S{accessToken}',
          })
          
          
          .expectStatus(204)
          .inspect()
    })

    it('should get empty bookmark',async()=>{
      return pactum
      .spec()
      .get('/bookmarks')
      .withHeaders({
        Authorization: 'Bearer $S{accessToken}',
      })
     
      .expectStatus(200)
      .expectJsonLength(0)
      .expectBody([]);
    })
    });
  });
  
});
