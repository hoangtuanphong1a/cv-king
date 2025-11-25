#!/bin/bash

# Script để debug và kiểm tra quá trình deployment từng bước

echo "🔍 SCRIPT DEBUG DEPLOYMENT CI/CD"
echo "==================================="

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SERVER_HOST="206.189.88.56"
SERVER_USER="ubuntu"

# Check if private key file exists
if [ ! -f "server_private_key" ]; then
    echo -e "${RED}❌ Không tìm thấy file server_private_key${NC}"
    echo "Hãy chạy fix-ssh-key.sh hoặc fix-ssh-key-windows.bat trước"
    exit 1
fi

echo -e "${BLUE}🔧 BƯỚC 0: Kiểm tra SSH connection${NC}"
echo "Testing SSH connection..."
if ssh -o StrictHostKeyChecking=no -i server_private_key -o ConnectTimeout=10 "$SERVER_USER@$SERVER_HOST" "echo 'SSH connection successful'" 2>/dev/null; then
    echo -e "${GREEN}✅ SSH connection works${NC}"
else
    echo -e "${RED}❌ SSH connection failed${NC}"
    echo "Hãy sửa vấn đề SSH key trước"
    exit 1
fi

echo ""
echo -e "${BLUE}🔧 BƯỚC 1: Tạo thư mục trên server${NC}"
ssh -o StrictHostKeyChecking=no -i server_private_key "$SERVER_USER@$SERVER_HOST" "mkdir -p ~/project && chmod 755 ~/project && echo 'Directory created successfully'"

echo ""
echo -e "${BLUE}🔧 BƯỚC 2: Kiểm tra Docker trên server${NC}"
echo "Checking Docker installation..."
if ssh -o StrictHostKeyChecking=no -i server_private_key "$SERVER_USER@$SERVER_HOST" "docker --version" 2>/dev/null; then
    echo -e "${GREEN}✅ Docker is installed${NC}"
else
    echo -e "${RED}❌ Docker is not available on server${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}🔧 BƯỚC 3: Kiểm tra docker-compose trên server${NC}"
echo "Checking docker-compose..."
if ssh -o StrictHostKeyChecking=no -i server_private_key "$SERVER_USER@$SERVER_HOST" "docker compose version" 2>/dev/null; then
    echo -e "${GREEN}✅ Docker Compose is installed${NC}"
else
    echo -e "${RED}❌ Docker Compose is not available${NC}"
    echo "Trying with docker-compose command..."
    if ssh -o StrictHostKeyChecking=no -i server_private_key "$SERVER_USER@$SERVER_HOST" "docker-compose --version" 2>/dev/null; then
        echo -e "${YELLOW}⚠️ Using old docker-compose command, should update to 'docker compose'${NC}"
    else
        echo -e "${RED}❌ No docker-compose found${NC}"
        exit 1
    fi
fi

echo ""
echo -e "${BLUE}🔧 BƯỚC 4: Copy docker-compose.prod.yml lên server${NC}"
echo "Copying docker-compose file..."
if [ -f "../docker-compose.prod.yml" ]; then
    scp -o StrictHostKeyChecking=no -i server_private_key "../docker-compose.prod.yml" "$SERVER_USER@$SERVER_HOST:~/project/docker-compose.yml"
    echo -e "${GREEN}✅ Copied docker-compose.prod.yml successfully${NC}"
else
    echo -e "${RED}❌ docker-compose.prod.yml not found in parent directory${NC}"
    echo "Please ensure docker-compose.prod.yml exists"
    exit 1
fi

echo ""
echo -e "${BLUE}🔧 BƯỚC 5: Tạo file .env trên server${NC}"
echo "Creating .env file..."

# Use values similar to what's in Jenkins
DOCKER_USER="${DOCKER_USER:-test}"  # Replace with actual values for testing
DOCKER_PASS="${DOCKER_PASS:-test}"  # Replace with actual values for testing
DB_CONN="${DB_CONN:-test}"
BACKEND_IMAGE_NAME="cv-king-backend"
FRONTEND_IMAGE_NAME="cv-king-frontend"
SA_PASSWORD="123321  "
DB_NAME="JOB_DB"
JWT_SECRET="cv-king-super-secret-jwt-key-2024-secure"

ssh -o StrictHostKeyChecking=no -i server_private_key "$SERVER_USER@$SERVER_HOST" <<REMOTE_EOF
cd ~/project

echo "Creating .env file with test values..."
cat > .env <<EOF
DB_CONNECTION_STRING=${DB_CONN}
DOCKER_REGISTRY=docker.io/${DOCKER_USER}
BACKEND_IMAGE_NAME=${BACKEND_IMAGE_NAME}
FRONTEND_IMAGE_NAME=${FRONTEND_IMAGE_NAME}
SA_PASSWORD=${SA_PASSWORD}
DB_NAME=${DB_NAME}
JWT_SECRET=${JWT_SECRET}
EOF

echo ".env file created, contents:"
cat .env
REMOTE_EOF

echo ""
echo -e "${BLUE}🔧 BƯỚC 6: Test Docker login${NC}"
echo "Testing Docker login (you may need to replace with actual credentials)..."
ssh -o StrictHostKeyChecking=no -i server_private_key "$SERVER_USER@$SERVER_HOST" <<REMOTE_EOF
cd ~/project

echo "Setting up Docker authentication..."
mkdir -p ~/.docker

# Test with placeholder values (you'll need real Docker Hub credentials)
if [ ! -z "${DOCKER_USER}" ] && [ ! -z "${DOCKER_PASS}" ]; then
    echo "Attempting Docker login..."
    if echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin docker.io 2>/dev/null; then
        echo "✅ Docker login successful"
    else
        echo "⚠️ Docker login failed with provided credentials"
        echo "Creating manual auth config..."
        AUTH_TOKEN=\$(echo -n "${DOCKER_USER}:${DOCKER_PASS}" | base64 -w 0)
        cat > ~/.docker/config.json <<EOF
{
  "auths": {
    "https://index.docker.io/v1/": {
      "auth": "\${AUTH_TOKEN}"
    }
  }
}
EOF
        echo "✅ Manual auth config created"
    fi
else
    echo "⚠️ No Docker credentials provided - manual auth config needed"
fi
REMOTE_EOF

echo ""
echo -e "${BLUE}🔧 BƯỚC 7: Test docker-compose config${NC}"
echo "Testing docker-compose configuration..."
ssh -o StrictHostKeyChecking=no -i server_private_key "$SERVER_USER@$SERVER_HOST" <<REMOTE_EOF
cd ~/project

echo "Testing docker-compose config..."
if docker compose --env-file .env config > /dev/null 2>&1; then
    echo "✅ Docker-compose config is valid"
else
    echo "❌ Docker-compose config has errors:"
    docker compose --env-file .env config
fi
REMOTE_EOF

echo ""
echo -e "${BLUE}🔧 BƯỚC 8: Thu thập thông tin hệ thống${NC}"
echo "Gathering system information..."
ssh -o StrictHostKeyChecking=no -i server_private_key "$SERVER_USER@$SERVER_HOST" <<REMOTE_EOF
echo "=== SYSTEM INFO ==="
uname -a
echo ""
echo "=== DOCKER VERSION ==="
docker --version
echo ""
echo "=== DOCKER-COMPOSE VERSION ==="
docker compose version || docker-compose --version
echo ""
echo "=== DISK SPACE ==="
df -h
echo ""
echo "=== MEMORY ==="
free -h
echo ""
echo "=== RUNNING CONTAINERS ==="
docker ps -a
REMOTE_EOF

echo ""
echo -e "${GREEN}🎯 DEBUG HOÀN TẤT!${NC}"
echo ""
echo "Nếu có lỗi ở bước nào, hãy kiểm tra lại:"
echo "- SSH key authorization"
echo "- Docker installation on server"
echo "- Docker Hub credentials"
echo "- Environment variables"
echo "- Port availability (1433, 3004, 3005)"
echo ""
echo "Sau khi sửa các lỗi trên, hãy thử chạy manual deploy:"
echo "ssh -i server_private_key ubuntu@206.189.88.56 'cd ~/project && docker compose --env-file .env up -d'"
