# Queers-Who-Code-Backend

This is the backend API server for the Queers Who Code LGBTQ non-profit initiative.

## Getting Started

To get started with development, first clone this repository and run `npm install`. A `.env-example` file is provider to create your own `.env` from. It is reccomended you develop with Visual Studio Code and have the Eslint and Prettier extensions installed.

Available scripts:

- Start Server - `npm start`
- Start Server (Hot Reload) - `npm run dev`
- Run Tests - `npm test`
- Run Eslint - `npm lint`

For the database, a locally installed version of MongoDB will suffice or if you have Docker installed, you can create a persistent volume and start an instance of MongoDB with the following commands:

```sh
docker volume create mongodb_data
docker run --name mongodb -v mongodb_data:/data/db -p 27017:27017 -d mongo:latest
```
