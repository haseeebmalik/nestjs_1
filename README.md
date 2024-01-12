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
        open docker desktop app and then run following comand:
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


   