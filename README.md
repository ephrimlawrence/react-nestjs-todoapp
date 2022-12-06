<h1 align="center"> Notes APP </h1>

<p align="center">A prototype REST API for a notes taking app, built with <a href="https://github.com/nestjs/nest">Nest</a>
</p>

## Description
This project is a prototype notes taking app built using [NestJs](https://github.com/nestjs/nest) and React.

## Features

The following are the features of the app:
*  Creating a new note (with unique titles)
*  Updating a note (notes is updated while the user is typing)
*  Deleting a note

## Stack

* `NestJs` + `ExpressJs`, for backend API
* `Typescript`
* `MongoDB` as persistent storage
* `Swagger`, for generating of [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) and API documentation
* `ReactJs`, for building the front-end UI.


## Installation

> Ensure [MongoDB](https://mongodb.org) is installed on your system first

```bash
# create .env file, and update database config values
$ cp env.example .env

# install node dependencies
$ npm install
```

## Running the app

```bash
# database migrations
$ npm run knex -- migrate:latest

# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

> Visit [http://localhost:3000/swagger](http://localhost:3000/swagger) for the Swagger explorer of the api endpoint. <br>
> Complete documentation of the API endpoints can be accessed at [http://localhost:3000/docs.html](http://localhost:3000/docs.html)


## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
