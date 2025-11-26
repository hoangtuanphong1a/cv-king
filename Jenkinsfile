pipeline {
    agent any

    triggers {
        githubPush()
        pollSCM('H/2 * * * *') // Poll every 2 minutes
    }

environment {
BACKEND_IMAGE_NAME = "cv-king-backend"
FRONTEND_IMAGE_NAME = "cv-king-frontend"
SERVER_HOST = "206.189.88.56"
SERVER_USER = "root"


// SQL Server Configuration
SA_PASSWORD = "CvKing123!"
DB_NAME = "JOB_DB"
DB_USERNAME = "sa"
DB_HOST = "sqlserver"
DB_PORT = "1433"


// JWT Configuration
JWT_ACCESS_SECRET = "35661de8d970428b38fef10fa2a09fdcb06be08e37e8dd4ebc388b017e77f72e"
JWT_REFRESH_SECRET = "adb899b70a62ee55970c5d9dc03cb4c51e309967b218d0f2fe9d8dc8ad62876d"
JWT_ACCESS_EXPIRATION_TIME = "1h"
JWT_REFRESH_EXPIRATION_TIME = "7d"


// Docker Registry
DOCKER_REGISTRY = "docker.io/hoangtuanphong"
}

    stages {
        /* === STAGE 1: CHECKOUT CODE === */
        stage('Checkout') {
            steps {
                echo "📦 Đang lấy source code từ GitHub..."
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/hoangtuanphong1a/cv-king.git',
                        credentialsId: 'github-pat'
                    ]]
                ])
            }
        }

        /* === STAGE 2: BUILD DOCKER IMAGES === */
        stage('Docker Build & Push') {
            steps {
                echo "🐳 Bắt đầu build Docker images..."
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    set -e
                    REGISTRY=docker.io/$DOCKER_USER

                    echo "🚧 Build backend..."
                    docker build --no-cache --build-arg CACHE_BUST=${BUILD_NUMBER} -f backend/Dockerfile -t ${REGISTRY}/${BACKEND_IMAGE_NAME}:latest ./backend

                    echo "🚧 Build frontend..."
                    docker build -f frontend/Dockerfile -t ${REGISTRY}/${FRONTEND_IMAGE_NAME}:latest ./frontend

                    echo "🔑 Đăng nhập Docker Hub..."
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

                    echo "⬆️ Push frontend image..."
                    docker push ${REGISTRY}/${FRONTEND_IMAGE_NAME}:latest

                    echo "⬆️ Push backend image..."
                    docker push ${REGISTRY}/${BACKEND_IMAGE_NAME}:latest

                    echo "✅ Docker build & push hoàn tất."
                    '''
                }
            }
        }

        /* === STAGE 3: TEST SSH CONNECTION === */
        stage('Test Server Connection') {
            steps {
                echo "🔗 Kiểm tra kết nối SSH tới server..."
                sshagent (credentials: ['server-ssh-key']) {
                    sh 'ssh -o StrictHostKeyChecking=no -v $SERVER_USER@$SERVER_HOST "echo Kết nối SSH thành công ✅"'
                }
            }
        }

        /* === STAGE 4: DEPLOY SERVER === */
        stage('Deploy Server') {
            steps {
                echo "🚀 Bắt đầu deploy lên server..."
                withCredentials([
                    usernamePassword(credentialsId: 'dockerhub-cred',
                        usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS'),
                    string(credentialsId: 'db-conn', variable: 'DB_CONN'),
                    file(credentialsId: 'docker-compose-prop', variable: 'DOCKER_COMPOSE_PATH')
                ]) {
                  sshagent (credentials: ['server-ssh-key']) {
                    sh '''
                    set -e

                    # Verify credentials are available
                    echo "🔐 Docker credentials check:"
                    echo "USER: $DOCKER_USER"
                    echo "PASS length: ${#DOCKER_PASS}"

                    echo "=== [1/6] Tạo thư mục ~/project trên server ==="
                    ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "mkdir -p ~/project && chmod 755 ~/project"

                    echo "=== [2/6] Copy docker-compose.yml từ Jenkins credential lên server ==="
                    scp -o StrictHostKeyChecking=no $DOCKER_COMPOSE_PATH $SERVER_USER@$SERVER_HOST:~/project/docker-compose.yml

                    echo "=== [3/6] Bắt đầu deploy trên server ==="
                    ssh -T -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST <<REMOTE_EOF
                    set -ex
                    cd ~/project

                    # Export environment variables for remote shell
                    export DOCKER_USER="$DOCKER_USER"
                    export DOCKER_PASS="$DOCKER_PASS"
                    export DB_CONN="$DB_CONN"
                    export BACKEND_IMAGE_NAME="$BACKEND_IMAGE_NAME"
                    export FRONTEND_IMAGE_NAME="$FRONTEND_IMAGE_NAME"
                    export SA_PASSWORD="$SA_PASSWORD"
                    export DB_NAME="$DB_NAME"
                    export JWT_SECRET="$JWT_SECRET"

                    echo "➡️ Tạo file .env"
                    cat > .env <<EOF
DOCKER_REGISTRY=docker.io/\$DOCKER_USER
BACKEND_IMAGE_NAME=\$BACKEND_IMAGE_NAME
FRONTEND_IMAGE_NAME=\$FRONTEND_IMAGE_NAME
DB_PASSWORD=\$SA_PASSWORD
DB_NAME=\$DB_NAME
DB_USERNAME=\$DB_USERNAME
DB_HOST=\$DB_HOST
DB_PORT=\$DB_PORT
DB_TYPE=mssql
JWT_ACCESS_SECRET=\$JWT_ACCESS_SECRET
JWT_REFRESH_SECRET=\$JWT_REFRESH_SECRET
JWT_ACCESS_EXPIRATION_TIME=\$JWT_ACCESS_EXPIRATION_TIME
JWT_REFRESH_EXPIRATION_TIME=\$JWT_REFRESH_EXPIRATION_TIME
APP_PORT=\$APP_PORT
NODE_ENV=\$NODE_ENV
EOF
                    echo "📝 Nội dung file .env:"
                    cat .env

                    echo "🔑 Docker login"
                    mkdir -p ~/.docker
                    echo "\$DOCKER_PASS" | docker login -u "\$DOCKER_USER" --password-stdin docker.io

                    # Alternative: Create auth config manually if login fails
                    if [ \$? -ne 0 ]; then
                      echo "⚠️ Docker login failed, trying manual auth config..."
                      AUTH_TOKEN=\$(echo -n "\$DOCKER_USER:\$DOCKER_PASS" | base64 -w 0)
                      cat > ~/.docker/config.json <<EOF
{
  "auths": {
    "https://index.docker.io/v1/": {
      "auth": "\$AUTH_TOKEN"
    }
  }
}
EOF
                    fi

                    echo "🧹 Dừng và xoá container cũ"
                    docker compose --env-file .env down --timeout 60 --volumes --remove-orphans || true
                    docker container prune -f || true

                    echo "⬇️ Kéo image mới nhất"
                    docker compose --env-file .env pull

                    echo "▶️ Khởi động lại toàn bộ services"
                    docker compose --env-file .env up -d

                    echo "⏳ Đợi health checks..."
                    sleep 30

                    echo "📊 Kiểm tra initial container status..."
                    docker ps

                    echo "📊 Kiểm tra trạng thái services"
                    docker ps

                    echo "🧽 Dọn dẹp image không còn dùng"
                    docker image prune -f

                    echo "✅ Deploy thành công!"
REMOTE_EOF
                    '''
                  }
                }
            }
        }

//         /* === STAGE 5: VERIFY DEPLOYMENT === */
//         stage('Verify Deployment') {
//             steps {
//                 echo "🔍 Kiểm tra deployment sau khi deploy..."
//                 withCredentials([sshUserPrivateKey(credentialsId: 'server-ssh-key', keyFileVariable: 'SSH_KEY')]) {
//                     sh '''
//                     set -e
//                     echo "=== Kiểm tra HTTP endpoints ==="
//                     ssh -o StrictHostKeyChecking=no -i $SSH_KEY $SERVER_USER@$SERVER_HOST <<REMOTE_VERIFY
//                     set -e

//                     echo "🔍 Kiểm tra backend health endpoint..."
//                     if curl -f -s http://localhost:3004/health >/dev/null 2>&1; then
//                       echo "✅ Backend health: OK"
//                     else
//                       echo "❌ Backend health: FAILED"
//                       exit 1
//                     fi

//                     echo "🔍 Kiểm tra frontend endpoint..."
//                     if curl -f -s http://localhost:3005 >/dev/null 2>&1; then
//                       echo "✅ Frontend: OK"
//                     else
//                       echo "❌ Frontend: FAILED"
//                       exit 1
//                     fi

//                     echo "📊 Final container status:"
//                     docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

//                     echo "🎉 All services verified successfully!"
// REMOTE_VERIFY
//                     '''
//                 }
//             }
//         }
//     }

    post {
        success {
            echo "🎉 Pipeline hoàn tất thành công!"
        }
        failure {
            echo "❌ Pipeline thất bại, vui lòng kiểm tra log ở stage bị lỗi."
        }
    }
}
