#!/bin/bash

# Function to create the MySQL database
create_mysql_database() {
  HOST=$(grep "HOST:" backend/src/database/dbConfig.js | awk -F "'" '{print $2}')
  USER=$(grep "USER:" backend/src/database/dbConfig.js | awk -F "'" '{print $2}')
  PASSWORD=$(grep "PASSWORD:" backend/src/database/dbConfig.js | awk -F "'" '{print $2}')
  DB=$(grep "DB:" backend/src/database/dbConfig.js | awk -F "'" '{print $2}')

  # MySQL command to create the database
  CREATE_DB_CMD="mysql -h ${HOST} -u ${USER} -p${PASSWORD} -e \"CREATE DATABASE IF NOT EXISTS ${DB};\""

  # Execute the command
  eval $CREATE_DB_CMD
}

# Function to install dependencies for both frontend and backend
install_dependencies() {
  # Install frontend dependencies
  cd frontend
  npm install
  cd ..

  # Install backend dependencies
  cd backend
  npm install
  cd ..
}

# Function to run the backend server in the background
run_backend() {
  cd backend
  npm run dev &
  BACKEND_PID=$!
  cd ..
}

# Function to run the frontend development server in the background
run_frontend() {
  cd frontend
  npm run start &
  FRONTEND_PID=$!
  cd ..
}

# Function to stop the servers and frontend client
stop_servers() {
  if [[ -n $BACKEND_PID ]]; then
    echo "Stopping backend server..."
    kill $BACKEND_PID
  fi

  if [[ -n $FRONTEND_PID ]]; then
    echo "Stopping frontend development server..."
    kill $FRONTEND_PID
  fi
}

# Main function to run the app setup
run_app() {
  echo "Setting up the app..."

  # Create MySQL database
  create_mysql_database

  # Install frontend and backend dependencies
  install_dependencies

  echo "App setup completed!"

  # Start the backend server and frontend development server in the background
  run_backend
  run_frontend

  # Trap the SIGINT signal (Ctrl+C) and stop the servers before exiting the script
  trap stop_servers SIGINT

  # Wait for the background processes to finish
  wait
}

# Execute the app setup
run_app