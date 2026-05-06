# Docker & Local Deployment Guide

## Quick Start - Run Locally with Docker

### Prerequisites
- Docker Desktop installed
- `.env` file configured with your Sanity credentials

### Build and Run

1. **Copy environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

2. **Build the Docker image:**
   ```bash
   docker build -t breede-escape-web:latest .
   ```

3. **Run the container:**
   ```bash
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_SANITY_PROJECT_ID=<your-value> \
     -e NEXT_PUBLIC_SANITY_DATASET=<your-value> \
     breede-escape-web:latest
   ```

4. **Access the app:**
   ```
   http://localhost:3000
   ```

## Using Docker Compose

### Run with docker-compose:

```bash
# Build and start
docker-compose up --build

# Run in background
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f web
```

### Environment Setup for docker-compose:

Create a `.env` file in the project root:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
```

## Testing the Container Locally

### Health Check
```bash
# Test the health endpoint
curl http://localhost:3000/

# Should return 200 OK
```

### Build Verification
```bash
# Check image size
docker images breede-escape-web

# Inspect image layers
docker history breede-escape-web:latest

# Run in interactive mode for debugging
docker run -it -p 3000:3000 breede-escape-web:latest /bin/sh
```

## Pushing to Azure Container Registry

### 1. Authenticate with your registry:
```bash
az acr login --name breedeescaperegistry
```

Or with Docker credentials:
```bash
docker login breedeescaperegistry.azurecr.io \
  --username <username> \
  --password <password>
```

### 2. Tag the image:
```bash
docker tag breede-escape-web:latest \
  breedeescaperegistry.azurecr.io/breede-escape-web:latest

docker tag breede-escape-web:latest \
  breedeescaperegistry.azurecr.io/breede-escape-web:v1.0.0
```

### 3. Push to registry:
```bash
docker push breedeescaperegistry.azurecr.io/breede-escape-web:latest
docker push breedeescaperegistry.azurecr.io/breede-escape-web:v1.0.0
```

### 4. Verify in registry:
```bash
az acr repository show \
  --name breedeescaperegistry \
  --repository breede-escape-web

az acr repository show-tags \
  --name breedeescaperegistry \
  --repository breede-escape-web
```

## Container Networking & Port Binding

The container exposes port **3000** (Next.js default).

### Port mapping examples:
```bash
# Map container 3000 to localhost 3000
docker run -p 3000:3000 breede-escape-web:latest

# Map container 3000 to localhost 8080
docker run -p 8080:3000 breede-escape-web:latest

# Map to all interfaces
docker run -p 0.0.0.0:3000:3000 breede-escape-web:latest
```

## Resource Limits

The docker-compose.yml sets resource limits:
- **CPU**: 1 core (limit), 0.5 core (reservation)
- **Memory**: 512MB (limit), 256MB (reservation)

Adjust these in `docker-compose.yml` under `deploy.resources` for your needs.

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs <container_id>

# Run with verbose output
docker run -it breede-escape-web:latest npm start
```

### Port already in use
```bash
# Find what's using port 3000
lsof -i :3000

# Use a different port
docker run -p 8080:3000 breede-escape-web:latest
```

### Out of memory
```bash
# Increase resource limits in docker-compose.yml
# Or run with memory flag
docker run -m 1g breede-escape-web:latest
```

### Build context too large
```bash
# Verify .dockerignore is working
docker build --no-cache -t breede-escape-web:latest .

# Check layer sizes
docker history breede-escape-web:latest
```

## Production Considerations

1. **Image Size**: Current multi-stage build keeps size minimal
2. **Security**: Uses Node.js Alpine (smaller attack surface)
3. **Health Checks**: Built-in healthcheck in Dockerfile
4. **Logging**: Configure Docker log drivers for production
5. **Registry**: Use Azure Container Registry for private images

## Next Steps

For Azure Container Apps deployment, see [AZURE_DEPLOYMENT_GUIDE.md](AZURE_DEPLOYMENT_GUIDE.md)

## Useful Commands

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Remove image
docker rmi breede-escape-web:latest

# Remove dangling images
docker image prune

# Clean up everything (careful!)
docker system prune -a

# Inspect container details
docker inspect <container_id>

# Execute command in running container
docker exec -it <container_id> /bin/sh

# Copy file from container
docker cp <container_id>:/app/file.txt ./

# View resource usage
docker stats
```
