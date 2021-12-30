<!-- markdownlint-configure-file {
  "MD013": {
    "code_blocks": false,
    "tables": false
  },
  "MD033": false,
  "MD041": false
} -->

<div align="center">

# TrueNorth Challenge

![](https://img.shields.io/badge/powered%20by-NodeJS-brightgreen?style=for-the-badge&logo=appveyor)

This is a simple to-do list application.

[Getting started](#getting-started) •
[Tech Stack](#tech-stack) •
[REST Endpoints](#rest-endpoints) •
[Environment variables](#environment-variables) •

</div>

## Getting started

```sh
# clone project
git clone https://github.com/byeze/tn-challenge.git
cd tn-challenge

# install dependecines
npm i

# create the volume for the database
docker volume create tasks-vol-db

# run application
docker-compose up --build

# test the health of the application
curl -X GET http://localhost:3000/health
```

## Tech stack

This microservice is powered by:

- Nodejs 14.x
- Docker
- Typescript

## REST Endpoints

- `GET /health`: Health check
- `GET /readiness`: Health check
- `GET /tasks`: Get all tasks
- `PUT /tasks/:id`: Update a task by id
  - To update the status of a task, the body should look like this:
  ```json
  {
    "isCompleted": true
  }
  ```

## Environment variables

Environment variables can be used for configuration.

- `DB_DATABASE`

  - Specifies the database to use for the task api.

- `DB_USERNAME`

  - Specifies the username to use for the connection to the db.

- `DB_PASSWORD`

  - Password for the connection to the db.

- `DB_PORT`
  - Port for the connection to the db.
- `DB_HOST`
  - Host for the connection to the db.
