# Trello Clone App

- [Introduction](#Introduction)
- [Instalation](#Instalation)
- [Technologies](#Technologies)
- [Directory Structure](#Directory-Structure)
- [Demo](#Demo)
- [License](#License)

## Introduction

This is a sample project with a purpose to replicate Trello board and it's functionalities.

![Site Image](./demo/site.png)

## Instalation

### Development

1. Navigate to a following directory: `cd docker/dev`
2. Run command: `docker-compose -p "app_name" up --build`
3. Run command: `winpty docker-compose exec api bash` and in the docker container:
   - Navigate to `application/api` subdirectory
   - Run `apt-get update`
   - Run `composer install`
   - Run `php init` and chose in which environment you want to run it
   - Run `php yii migrate`

### Production

1. Navigate to a following directory: `cd docker/prod`
2. Run command: `docker-compose -p "app_name" up --build`
3. Run command: `winpty docker-compose exec api bash` and in the docker container:
   - Navigate to `application/api` subdirectory
   - Run `apt-get update`
   - Run `composer install`
   - Run `php init` and chose in which environment you want to run it
   - Run `php yii migrate`

## Technologies

    ├── FRONTEND                      # React.JS
    ├── RESTFUL API                   # Yii2 PHP Framework
    ├── WEBSERVER                     # Nginx

## Directory Structure

    ├── api                                  # Yii2 Rest API template application
    ├── web                                  # React web application template
    ├── logs                                 # Nginx access/error logs
    ├── docker                               # Dockerization config
    │   ├── dev
    │   │   ├── web
    │   │   │   ├── Dockerfile               # FRONTEND container build instructions
    │   │   ├── nginx
    │   │   │   ├── default.config           # Nginx default configuration
    │   │   ├── api
    │   │   │   ├── Dockerfile               # API container build instructions
    │   │   │   ├── pho-ini-overrides.ini    # Config for overriding php.ini settings
    │   │   ├── .env                         # Environment variables
    │   │   ├── docker-compose.yml           # Docker compose boilerplate file
    │   │   ├── docker-database.env          # Database environment variables
    │   ├── prod
    │   │   ├── nginx
    │   │   │   ├── Dockerfile               # Nginx container build instructions
    │   │   │   ├── default.config           # Nginx default configuration
    │   │   ├── api
    │   │   │   ├── Dockerfile               # API container build instructions
    │   │   │   ├── pho-ini-overrides.ini    # Config for overriding php.ini settings
    │   │   ├── .env                         # Environment variables
    │   │   ├── docker-compose.yml           # Docker compose boilerplate file
    │   │   ├── docker-database.env          # Database environment variables
    └── README.md

## Demo

### Working with boards

![Boards GIF](./demo/boards.gif)

### Working with lists

![Lists GIF](./demo/lists.gif)

### Working with tasks

![Tasks GIF](./demo/tasks.gif)

## License

This project is licensed under the MIT License.
