pipeline {
    agent any

    triggers {
        pollSCM('H * * * *') // Poll every hour
    }

environment {
BACKEND_IMAGE_NAME = "cv-king-backend"
FRONTEND_IMAGE_NAME = "cv-king-frontend"
SERVER_HOST = "206.189.88.56"
SERVER_USER = "root"


// SQL Server Configuration (Windows remote)
SA_PASSWORD = "CvKing123!"
DB_NAME = "JOB_DB"
DB_USERNAME = "sa"
DB_HOST = "206.189.88.56"
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
        stage('Deploy to Server') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-cred',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    ),
                    file(credentialsId: 'docker-compose-file', variable: 'DOCKER_COMPOSE_FILE')
                ]) {
                    sshagent(credentials: ['server-ssh-key']) {
                        sh '''
                        set -e

                        echo "Copy docker-compose.yml lên server..."
                        scp -o StrictHostKeyChecking=no "$DOCKER_COMPOSE_FILE" root@${SERVER_HOST}:~/project/docker-compose.yml

                        echo "Deploy trên server..."
                        ssh -o StrictHostKeyChecking=no root@${SERVER_HOST} << 'EOF'
                        cd ~/project || mkdir -p ~/project && cd ~/project

                        # Export Jenkins environment variables để resolve trong SSH session
                        export DOCKER_REGISTRY="${DOCKER_REGISTRY}"
                        export BACKEND_IMAGE_NAME="${BACKEND_IMAGE_NAME}"
                        export FRONTEND_IMAGE_NAME="${FRONTEND_IMAGE_NAME}"
                        export SA_PASSWORD="${SA_PASSWORD}"
                        export DB_NAME="${DB_NAME}"
                        export JWT_ACCESS_SECRET="${JWT_ACCESS_SECRET}"
                        export JWT_REFRESH_SECRET="${JWT_REFRESH_SECRET}"
                        export JWT_ACCESS_EXPIRATION_TIME="${JWT_ACCESS_EXPIRATION_TIME}"
                        export JWT_REFRESH_EXPIRATION_TIME="${JWT_REFRESH_EXPIRATION_TIME}"

                        # Tạo file .env với variables đã được export
                        cat > .env << ENV
DOCKER_REGISTRY=${DOCKER_REGISTRY}
BACKEND_IMAGE_NAME=${BACKEND_IMAGE_NAME}
FRONTEND_IMAGE_NAME=${FRONTEND_IMAGE_NAME}
DB_PASSWORD=${SA_PASSWORD}
DB_NAME=${DB_NAME}
DB_USERNAME=${DB_USERNAME}
DB_HOST=${DB_HOST}
DB_PORT=${DB_PORT}
DB_TYPE=mssql
JWT_ACCESS_SECRET=${JWT_ACCESS_SECRET}
JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
JWT_ACCESS_EXPIRATION_TIME=${JWT_ACCESS_EXPIRATION_TIME}
JWT_REFRESH_EXPIRATION_TIME=${JWT_REFRESH_EXPIRATION_TIME}
APP_PORT=3003
NODE_ENV=production
ENV

                        echo "Docker login trên server..."
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin || true

                        echo "Dừng và dọn sạch cũ..."
                        docker compose --env-file .env down -v --remove-orphans || true
                        docker system prune -f --volumes || true

                        echo "Pull image mới..."
                        docker compose --env-file .env pull --quiet

                        echo "Khởi động dịch vụ..."
                        docker compose --env-file .env up -d --force-recreate

                        echo "Trạng thái cuối cùng:"
                        docker compose --env-file .env ps

                        echo "DEPLOY THÀNH CÔNG 100%!"
                        echo "Truy cập: http://${SERVER_HOST}:3005"
EOF
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo "PIPELINE HOÀN TẤT – HỆ THỐNG ĐÃ CHẠY ỔN ĐỊNH!"
            echo "FRONTEND: http://${SERVER_HOST}:3005"
            echo "BACKEND HEALTH: http://${SERVER_HOST}:3004/health"
        }
        failure {
            echo "Deploy thất bại – vui lòng kiểm tra log Jenkins."
        }
        always {
            cleanWs()
        }
    }
}
