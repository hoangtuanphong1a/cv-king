# CoffeeKing Restaurant Management System

A full-stack restaurant management system built with NestJS, Next.js, and MySQL.

## Docker Setup

This project includes a properly configured Docker setup for production deployment.

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/hoangtuanphong1a/coffeeking.git
   cd coffeeking
   ```

2. **Configure environment variables**
   ```bash
   cp .env .env.local  # Optional: for local overrides
   ```

3. **Build and start all services**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

4. **Verify services are running**
   ```bash
   docker-compose -f docker-compose.prod.yml ps
   ```

### Services

- **MySQL Database** (port 3307): Database for the application
- **Backend API** (port 3000): NestJS API server
- **Frontend** (port 3001): Next.js web application

### Environment Variables

The following environment variables are configured in `.env`:

```env
# Database Configuration
DB_HOST=mysql
DB_PORT=3306
DB_NAME=restaurant_management
DB_USER=TUANPHONG
DB_PASSWORD=123321

# JWT Configuration
JWT_SECRET=supersecretjwtkeyforproduction
JWT_EXPIRES_IN=24h

# MySQL Configuration
MYSQL_ROOT_PASSWORD=123321
MYSQL_DATABASE=restaurant_management
MYSQL_USER=TUANPHONG
MYSQL_PASSWORD=123321

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Docker Commands

```bash
# Build all services
docker-compose -f docker-compose.prod.yml build

# Start all services
docker-compose -f docker-compose.prod.yml up -d

# Stop all services
docker-compose -f docker-compose.prod.yml down

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Rebuild and restart a specific service
docker-compose -f docker-compose.prod.yml up --build -d backend
```

### Development

For development, you can also run services individually:

```bash
# Backend only
cd backend && npm run start:dev

# Frontend only
cd frontend && npm run dev
```

### Production Deployment

The Docker setup is optimized for production with:
- Multi-stage builds for smaller image sizes
- Non-root users for security
- Proper dependency management
- Health checks for service dependencies
- Environment variable configuration

### Troubleshooting

1. **Port conflicts**: Make sure ports 3000, 3001, and 3307 are available
2. **Database connection**: Wait for MySQL health check to pass before starting other services
3. **Build issues**: Clear Docker cache with `docker system prune -a`

### Architecture

- **Backend**: NestJS with TypeScript, MikroORM, MySQL
- **Frontend**: Next.js with TypeScript, Tailwind CSS
- **Database**: MySQL 8.0 with persistent volumes
- **Networking**: Isolated Docker network for service communication
