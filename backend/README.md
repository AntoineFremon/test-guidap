# Requirements
* Install [Docker (v20.10+)](https://docs.docker.com/engine/install/)
* Install [Docker Compose (v2.10+)](https://docs.docker.com/compose/install/)

# Install the project for the first time
1. Go in the project folder `test-guidap`
2. Run `cd backend && npm install`
3. Run `docker-compose build`

# Setup environment
1. Fill all database variables according to your database (`DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_HOST`, `DATABASE_PORT`)
2. Put a secret phrase for jwt generation in `SECRET`
3. Put your Mapbox token in `MAPBOX_TOKEN`
4. Put your Open Weather API token in `OPEN_WEATHER_API_TOKEN`

# Start the project
1. Run `docker-compose up`
2. Go to http://localhost:8000

# Stopping all the containers
1. Ctrl+C when the containers are running
2. Run `docker-compose down`

# Versions
* Nodejs version: `16`
