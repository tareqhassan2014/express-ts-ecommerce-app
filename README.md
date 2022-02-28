<h3 align="center">
    <a href="https://github.com/tareqhassan2014/express-ts-ecommerce-app">
       Express Typescript E-Commerce Application
    </a>
</h3>

### Core Packages

You need to install the below Packages:

-   express
-   typescript
-   mongoose
-   jsonwebtoken
-   bcrypt
-   and some small packages ....................

1. Run the script

```sh
git init
npm init -y
touch .gitignore
tsc --init
yarn add express dotenv mongoose helmet morgan cors compression envalid joi jsonwebtoken bcrypt
yarn add -D typescript nodemon ts-node @types/express @types/node @types/dotenv @types/compression @types/cors @types/morgan @types/helmet @types/jsonwebtoken @types/bcrypt

```

### Script

```json

 "scripts": {
        "start": "node build/server.js",
        "debug": "ndb build/server.js",
        "build": "tsc",
        "dev": "nodemon src/server.ts",
        "postinstall": "npm run build"
    },

```

### Edit tsconfig.json

edit `tsconfig.json` file in the project root and enter the below contents:

```json
{
    "compilerOptions": {
        "target": "ESNext",
        "module": "Commonjs",
        "rootDir": "./src",
        "moduleResolution": "node",
        "outDir": "./build",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true
    }
}
```
