# Note Manager App

## Description

This is a Note Manager App that helps you organize and manage your notes. The app is divided into frontend and backend components. The frontend is built using React, and the backend is powered by Node.js with Express. The data is stored in a MySQL database using Sequelize as the ORM (Object-Relational Mapping).

## Frontend

### Technologies Used

- React 18.2.0
- React DOM 18.2.0
- React Router DOM 6.14.2
- Axios 1.4.0

### Testing Libraries

- Testing Library Jest DOM 5.17.0
- Testing Library React 13.4.0
- Testing Library User Event 13.5.0

### Other Dependencies

- Web Vitals 2.1.4

### Scripts

To run the frontend, use the following scripts:

- `npm start`: Start the development server.
- `npm build`: Build the production-ready bundle.
- `npm test`: Run tests for the frontend.
- `npm eject`: Eject the app from Create React App configuration.

## Backend

### Technologies Used

- Node.js
- Express 4.18.2

### Database

- MySQL 5.7

### ORM (Object-Relational Mapping)

- Sequelize 6.32.1

### CORS Support

- CORS 2.8.5

### Other Dependencies

- MySQL2 3.5.2
- Sequelize CLI 6.6.1

### Development Dependencies

- Dotenv 16.3.1
- Nodemon 3.0.1

### Scripts

To run the backend, use the following scripts:

- `npm start`: Start the backend server for production.
- `npm run dev`: Start the backend server in development mode using Nodemon for auto-reloading.

## Prerequisites

Before running the app, make sure you have the following installed on your system:

- Node.js
- MySQL Server (Version 5.7)
- A MySQL database for the app with appropriate credentials (You can set up this in the .env file).

## Getting Started

1. Clone this repository to your local machine.
2. Install frontend dependencies by navigating to the `frontend` folder and running `npm install`.
3. Install backend dependencies by navigating to the `backend` folder and running `npm install`.
4. Create a `.env` file in the `backend` folder and set the necessary environment variables for connecting to your MySQL database. (Refer to `.env.example` for reference).
5. Start the frontend by running `npm start` from the `frontend` folder.
6. Start the backend by running `npm run dev` from the `backend` folder.

Now you should have the Note Manager App up and running locally.
