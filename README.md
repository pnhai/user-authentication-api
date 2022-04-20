## I. Install and build

#### 1. Clone this repo

```
$ git clone https://github.com/pnhai/user-authentication-api.git your-app-name
$ cd your-app-name
```

#### 2. Build and run with npm

```
$ npm i && npm start
```

#### 3. Run with docker-compose

```
$ docker-compose up
```

#### 4. Run unit test

```
$ npm test
```

#### 5. Test apis

```
url: localhost:7400/auth/login
method: POST
body: JSON
{
  "username":"123456",
  "password":"123456"
}

----------
response:
success:
{
    "user": {
        "_id": "625f8f9838da2f069fa6b885",
        "username": "123456",
        ...
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "status": "success",
    "message": "Logged in successfully"
}

error:
{
    "status": "error",
    "message": "Invalid Username and Password"
}

lock:
{
    "status": "error",
    "message": "User is locked"
}
```

---

## II. Environment

To edit environment variables, create a file with name `.env` and copy the contents from `.env.default` to start with.

| Var Name  | Type   | Default                                         | Description                            |
| --------- | ------ | ----------------------------------------------- | -------------------------------------- |
| NODE_ENV  | string | `development`                                   | API runtime environment. eg: `staging` |
| PORT      | number | `7400`                                          | Port to run the API server on          |
| MONGO_URL | string | `mongodb://localhost:27017/user-authentication` | URL for MongoDB                        |

---

### III. Directory Structure

```
├── docker-compose.yml
├── Dockerfile
├── package.json
├── README.md
├── src
│   ├── app.ts
│   ├── components
│   │   └── authComponent.ts
│   ├── config
│   │   ├── connect.ts
│   │   └── env.ts
│   ├── controllers
│   │   └── authController.ts
│   ├── models
│   │   └── user.ts
│   ├── routes
│   │   ├── authRoute.ts
│   │   └── index.ts
│   └── utils
│       └── initDB.ts
└── tsconfig.json

```
