#!/bin/bash

create_mysql_database() {
  HOST=$(grep "HOST:" backend/src/database/dbConfig.js | awk -F "'" '{print $2}')
  USER=$(grep "USER:" backend/src/database/dbConfig.js | awk -F "'" '{print $2}')
  PASSWORD=$(grep "PASSWORD:" backend/src/database/dbConfig.js | awk -F "'" '{print $2}')
  DB=$(grep "DB:" backend/src/database/dbConfig.js | awk -F "'" '{print $2}')

  export MYSQL_PWD="${PASSWORD}"

  CREATE_DB_CMD="mysql -h ${HOST} -u ${USER} -e \"CREATE DATABASE IF NOT EXISTS ${DB};\""

  eval $CREATE_DB_CMD
}

install_dependencies() {
  cd frontend
  npm install
  cd ..

  cd backend
  npm install
  cd ..
}

run_backend() {
  cd backend
  npm run dev &
  BACKEND_PID=$!
  cd ..
}

run_frontend() {
  cd frontend
  npm run start &
  FRONTEND_PID=$!
  cd ..
}

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

run_app() {
  echo "Setting up the app..."

  create_mysql_database

  install_dependencies

  echo "App setup completed!"

  run_backend
  run_frontend

  trap stop_servers SIGINT

  wait
}

run_app