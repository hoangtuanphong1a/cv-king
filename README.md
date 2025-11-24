# CV King - Job Portal System

A full-stack job portal system built with NestJS, Next.js, and SQL Server.

---

## 🚀 CI/CD Pipelines

This repository contains multiple Jenkins pipelines for different projects:

### 📁 CV King (Node.js) - `Jenkinsfile`
**Main job portal application**
- Location: `d:/DuAnTotNghiep/cicd_devops`
- Repository: `https://github.com/hoangtuanphong1a/cv-king.git`
- Branch: `main`

### 📁 LearnKing (.NET) - `Jenkinsfile.dotnet`
**LMS (Learning Management System)**
- Repository: `https://github.com/XT-xuantruong/learnking.server.git`
- Branch: `master`
- Tech Stack: .NET Core, SQL Server
- Dockerfile: Custom .NET image
- Docker Compose: `docker-compose.learnking.yml`
- Environment: `.env.learnking.example`

## Docker Setup

This project includes a properly configured Docker setup for production deployment.

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/hoangtuanphong1a/cv-king.git
   cd cicd_devops
   ```

2. **Configure environment variables**
   ```bash
   # For development
   cp backend/.env.example backend/.env
   # Edit backend/.env with your database credentials

   # For production deployment
   cp .env.example .env
   # Edit .env with your Docker registry and production settings
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

- **SQL Server Database** (port 1433): Database for the application
- **Backend API** (port 3004): NestJS API server
- **Frontend** (port 3005): Next.js web application

### Environment Variables

The following environment variables are configured in `backend/.env`:

```env
# Database Configuration
DB_TYPE=mssql
DB_HOST=sqlserver
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=your_password
DB_NAME=cv_king_db

# JWT Configuration
JWT_ACCESS_SECRET=your_access_token_secret_key
JWT_REFRESH_SECRET=your_refresh_token_secret_key
JWT_ACCESS_EXPIRATION_TIME=1h
JWT_REFRESH_EXPIRATION_TIME=7d

# App Configuration
APP_PORT=3003
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

### CI/CD Pipeline

This project includes a Jenkins pipeline for automated deployment:

- **Build**: Docker images for backend and frontend
- **Push**: Images to Docker Hub
- **Deploy**: All services to production server
- **Verify**: Health checks for all services

### Troubleshooting

1. **Port conflicts**: Make sure ports 1433, 3004, and 3005 are available
2. **Database connection**: Wait for SQL Server health check to pass before starting other services
3. **Build issues**: Clear Docker cache with `docker system prune -a`

### Architecture

- **Backend**: NestJS with TypeScript, MikroORM, SQL Server
- **Frontend**: Next.js with TypeScript, Tailwind CSS
- **Database**: SQL Server 2022 with persistent volumes
- **Networking**: Isolated Docker network for service communication
