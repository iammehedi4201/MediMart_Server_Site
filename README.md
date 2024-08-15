# <p style="color: blue">project setup steps : <p>

## prerequisites

- Node.js
- npm
- MongoDb

## Installation

1. Clone the respository :

```ts
git clone https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-iammehedi4201.git

```

2. Navigate into the directory

```ts

cd your-repo

```

3. Install the Dependecies :

```ts

npm install

```

4. configuration

. Create a `.env` file in the root directory of the project
. Add the following environment variables to the `.env` file

```ts

NODE_ENV= development
PORT= 3001
DATABASE_URL= your mongodb url
BCRYPT_SALT_ROUND= give bcrypt slat round
JWT_ACCESS_SECRET_KEY= give jwt access secret
ACCESS_TOKEN_EXPIERY= give jwt expirery time

```

5. Run the Application

```ts

npm run start:dev

```

6. Access the Application

- your appplication should now be running. Access it a web browser using

```ts
http://localhost: your server port number like 3001

```

7. Api Documentation :

```ts
https://documenter.getpostman.com/view/31186550/2sA3s7ioS8

```