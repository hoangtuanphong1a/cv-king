pipeline {
    agent any

    triggers {
        // Trigger khi có push lên branch main
        githubPush()

        // Hoặc poll SCM mỗi 2 phút (backup)
        // pollSCM('H/2 * * * *')
    }

    environment {
        REGISTRY = "docker.io/${DOCKER_USERNAME}"
        BACKEND_IMAGE_NAME = "cv-king-backend"
        FRONTEND_IMAGE_NAME = "cv-king-frontend"
        SERVER_HOST = "206.189.88.56"
        SERVER_USER = "ubuntu"

        // SQL Server Configuration
        SA_PASSWORD = "StrongPass123!"
        DB_NAME = "cv_king_db"

        // JWT Configuration
        JWT_SECRET = "cv-king-super-secret-jwt-key-2024-secure"
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

        /* === STAGE 2: BUILD SOURCE CODE === */
        stage('Build Source Code') {
            steps {
                echo "🔧 Bắt đầu build source code..."

                // Build Backend
                echo "📦 Build backend..."
                dir('backend') {
                    sh '''
                    if [ -f yarn.lock ]; then
                        echo "📦 Using Yarn for backend..."
                        yarn install --frozen-lockfile
                        yarn build
                    elif [ -f package-lock.json ]; then
                        echo "📦 Using NPM for backend..."
                        npm ci
                        npm run build
                    else
                        echo "📦 Fallback to NPM for backend..."
                        npm install
                        npm run build
                    fi
                    '''
                }

                // Build Frontend
                echo "⚛️  Build frontend..."
                dir('frontend') {
                    sh '''
                    if [ -f pnpm-lock.yaml ]; then
                        echo "📦 Using PNPM for frontend..."
                        pnpm install --frozen-lockfile
                        pnpm build
                    elif [ -f yarn.lock ]; then
                        echo "📦 Using Yarn for frontend..."
                        yarn install --frozen-lockfile
                        yarn build
                    elif [ -f package-lock.json ]; then
                        echo "📦 Using NPM for frontend..."
                        npm ci
                        npm run build
                    else
                        echo "📦 Fallback to NPM for frontend..."
                        npm install
                        npm run build
                    fi
                    '''
                }

                echo "✅ Source code build hoàn tất."
            }
        }

        /* === STAGE 3: BUILD DOCKER IMAGES === */
        stage('Docker Build & Push') {
            steps {
                echo "🐳 Bắt đầu build Docker images..."
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    set -e
                    REGISTRY=docker.io/$DOCKER_USER

                    echo "🚧 Build backend..."
                    docker build --build-arg CACHE_BUST=${BUILD_NUMBER} -f backend/Dockerfile -t ${REGISTRY}/${BACKEND_IMAGE_NAME}:latest ./backend

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
                    file(credentialsId: 'docker-compose-prod', variable: 'DOCKER_COMPOSE_PATH')
                ]) {
                    sshagent (credentials: ['server-ssh-key']) {
                        sh '''
                        set -e

                        echo "📁 Tạo thư mục project trên server"
                        ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "mkdir -p ~/project"

                        echo "📋 Copy docker-compose.yml lên server"
                        scp -o StrictHostKeyChecking=no $DOCKER_COMPOSE_PATH $SERVER_USER@$SERVER_HOST:~/project/docker-compose.yml

                        echo "🚀 Deploy lên server"
                        ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "
                        cd ~/project && \\
                        echo \\"DB_CONNECTION_STRING=$DB_CONN\\" > .env && \\
                        echo \\"DOCKER_REGISTRY=docker.io/$DOCKER_USER\\" >> .env && \\
                        echo \\"BACKEND_IMAGE_NAME=$BACKEND_IMAGE_NAME\\" >> .env && \\
                        echo \\"FRONTEND_IMAGE_NAME=$FRONTEND_IMAGE_NAME\\" >> .env && \\
                        echo \\"SA_PASSWORD=$SA_PASSWORD\\" >> .env && \\
                        echo \\"DB_NAME=$DB_NAME\\" >> .env && \\
                        echo \\"JWT_SECRET=$JWT_SECRET\\" >> .env && \\
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin && \\
                        docker compose --env-file .env pull && \\
                        docker compose --env-file .env down --timeout 60 --volumes --remove-orphans || true && \\
                        docker compose --env-file .env up -d && \\
                        sleep 30 && \\
                        docker ps && \\
                        docker image prune -f
                        "
                        '''
                    }
                }
            }
        }

        /* === STAGE 5: VERIFY DEPLOYMENT === */
        stage('Verify Deployment') {
            steps {
                echo "🔍 Kiểm tra deployment sau khi deploy..."
                sshagent (credentials: ['server-ssh-key']) {
                    sh '''
                    set -e
                    echo "=== Kiểm tra HTTP endpoints ==="
                    ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST <<REMOTE_VERIFY
                    set -e

                    echo "🔍 Kiểm tra backend health endpoint..."
                    if curl -f -s http://localhost:3004/health >/dev/null 2>&1; then
                      echo "✅ Backend health: OK"
                    else
                      echo "❌ Backend health: FAILED"
                      exit 1
                    fi

                    echo "🔍 Kiểm tra frontend endpoint..."
                    if curl -f -s http://localhost:3005 >/dev/null 2>&1; then
                      echo "✅ Frontend: OK"
                    else
                      echo "❌ Frontend: FAILED"
                      exit 1
                    fi

                    echo "📊 Final container status:"
                    docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"

                    echo "🎉 All services verified successfully!"
REMOTE_VERIFY
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "🎉 Pipeline hoàn tất thành công!"
        }
        failure {
            echo "❌ Pipeline thất bại, vui lòng kiểm tra log ở stage bị lỗi."
        }
    }
}
