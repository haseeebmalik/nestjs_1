# nestjs_1

  1. Module
     nest cli:

        we can use nest cli to create modules like below:

           nest g module user

        It will create a module and import it in app.module.ts

   2. here we are using postgres sql for our database server. we are using docker compose to run postgres locally in a container.
     
     steps: 
     1.download docker and install it.
     2.Add docker-compose.yml file with following content.
     3.run following command in your project:
        open docker desktop app and then run following command:
        docker compose up dev-db -d
        it will start your container in background  

        now if you write docker ps in cmd you see one container running.

        you can see docker container activity log by command:  

          docker logs <CONTAINER ID>

      now its time to connect our nest app with database.

      Prisma(ORM): 
         1. Installation :
            npm i prisma

            npm i @prisma/client

            now init prisma in our project by command:
            npx prisma init

         2. Now we need to create schema in side of file schema.prisma.
            npx prisma --help

         3. Update the database url in env file with the required values we have.

         3. Now run command 

           npx prisma migrate dev


           above command will create a folder called migrations, which will contains our sql according to schema.

           This will also push these migrations into database.

           now if you write npx prisma studio, it will take you to a ui version of your data base. There you see that the tables are being created.

           It will also create types for the type script you can also get them from nextjs/common like below:

           import {User, Bookmark} from "nextjs/common"


   
   DTO: 
      In NestJS, a Data Transfer Object (DTO) is a simple class used to transfer data between different parts of your application, often between the client and server. DTOs help define the structure of the data being exchanged and serve as a contract between the client and the server.
    
    Steps: install two libraries
        class-transformer
        class-validator

      Then create a dto file and import it in your controllers.
      Then see your auth.controller.ts file to see how to use them.
      After that import and use "ValidationPipe" in main.ts file. 



      Testing app:
        
        End to end testing: Here we are using end to end testing to test our app.

        We use jest as the main testing library

        and we use pactum to send api request for testing the response.

        For this we use library PactumJs.
           npm install pactum


   Environments: Prisma support different environment files like .env, .env.test etc

    we need two packages here:
    1. dotenv-cli
    2. cross-env

    and in our script we can give the env in the scripts.

    for prisma studio to run in test env we need following command

    dotenv -e .env.test -- npx prisma start dev

    now prisma will also take env variables from the file you give above command.

    for test suit to run we need to run following command: 
    npm run test:e2e (we have this script in package.json)







   