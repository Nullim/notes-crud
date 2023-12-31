# Note Manager App

## Follow [this](https://notes-crud-05b45bb110b0.herokuapp.com/) link to view the live version! (Currently offline, please message me if you want to checkout the app)

## Description

This is a Note Manager App that helps you organize and manage your notes. The app is divided into frontend and backend components. The frontend is built using React, and the backend is powered by Node.js with Express. The data is stored in a MySQL database using Sequelize as the ORM (Object-Relational Mapping).

## Prerequisites

Make sure you have the following installed on your system:

- Node.js
- MySQL Server (Version 5.7)
- Appropriate credentials (You can set up this in the dbconfig.js file mentioned in the instructions) to create a database in you MySQL Server.

## Getting Started
Before running the app, you need:

- To set up the database configuration

- To have npm installed (mandatory)

- To have installed the MySQL command line interface on your PC.

## Instructions

1. Clone this repository to your local machine.
2. Modify the `backend/src/database/dbConfig.js` file with the following content:

```js
module.exports = {
  HOST: 'localhost',
  USER: 'your-mysql-username',
  PASSWORD: 'your-mysql-password',
  DB: 'your-mysql-database-name',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
```
Replace your-mysql-username, your-mysql-password, and your-mysql-database-name with your actual MySQL credentials.

Make sure your MySQL server is running before starting!

## Running the App
To start the app, open the repository and run the following command from the package.json located in the root using GitBash:

npm run start

Use CTRL + C to stop the server.

If the program does not run after running the script then follow these steps:

1. Install the dependencies from the /backend and /frontend package.json folders using "npm i" (You will have to navigate to these folders yourself)
2. Head to the backend directory and run the "npm run start" command there
3. Head to the frontend directory and run the "npm run start" command there

Now you should have the Note Manager App up and running locally.

## Frontend

### Technologies Used

- React 18.2.0
- React DOM 18.2.0
- React Router DOM 6.14.2
- Axios 1.4.0

### Other Dependencies

- Web Vitals 2.1.4

### Scripts

If you wish to run the frontend separately, use the following scripts from within the frontend directory:

- `npm start`: Start the development server.
- `npm build`: Build the production-ready bundle.

Remember to install dependencies!

## Backend

### Technologies Used

- Node.js
- Express 4.18.2

### Database

- MySQL 5.7
- MySQL2 3.5.2

### ORM (Object-Relational Mapping)

- Sequelize 6.32.1

### CORS Support

- CORS 2.8.5

### Development Dependencies

- Nodemon 3.0.1

### Scripts

If you wish to run the backend separately, use the following scripts from within the backend directory

- `npm start`: Start the backend server for production.
- `npm run dev`: Start the backend server in development mode using Nodemon for auto-reloading.
