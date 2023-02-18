Appliccation configuration:
    - npm

Database:
    - SQLITE3
    - KNEX
        - Migrations:
            - Create a new migration: npm run knex -- migrate:make create-namemigration 
            - Execute the lastest migration created : npm run knex -- migrate:latest
            - Rollback the migration: npm run knex -- migrate:rollback

Ambient Variables:
    Explanation: 
        - Variables can be diferent from each ambient (development or production) that the code is running.
        - .env can not be send to github, the data could be with secure credentials.


Libraries:
    - knex:

    - sqlite3:

    - Fastify: (better than express)

    - D typescript :
        (exe) npx tsc --init (create a tsconfig.json)

    - D @types/node:

    - D tsx: (convert typescript into javascript)

        (exe) npx tsc src/server.ts (inittialize server)
        
        scripts:
            "dev": "tsx watch src/server.ts", (inittialize and watch server, more fast)

    - D eslint:
        D eslint @rocketseat/eslint-config (pattern rocketseat)

        ctrl + shift + p (preferencies : open user settings json)
           
            inside settings:
                "editor.codeActionsOnSave": {
                    "source.fixAll.eslint": true,
                }
            package.json:
                 "lint": "eslint src --ext .ts --fix" (fix all errors with eslint)

    - dotenv (can read de data .env)

    - ZOD:
        Explanation:
            Library to validate values
    
    - @fastify/cookie
        you can get information about the user even if he is not logged in
    
    - D vitest
        can make test in application
    
    - D supertest 
        You can test the application with out the server on
    
    - D tsup
        Help us to convert the code .ts in .js and  make deploy
        script: "build": "tsup src --out-dir build"
        node build/server.js

    