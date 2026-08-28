pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()

        buildDiscarder(logRotator(
            numToKeepStr: '10'
        ))
    }

    environment {
        IMAGE_NAME     = "mohammadkasim/cicd-demo"
        CONTAINER_NAME = "cicd-demo-app"
        IMAGE_TAG      = "${BUILD_NUMBER}"
        APP_PORT       = "8081"
    }

    stages {

        // ==========================================
        // 1. CHECKOUT
        // ==========================================
        stage('Checkout SCM') {
            steps {
                echo "📥 Checking out source code..."

                checkout scm

                echo "✅ Source code checkout completed"
            }
        }


        // ==========================================
        // 2. DOCKER LOGIN
        // ==========================================
        stage('Docker Login') {
            steps {
                echo "🔐 Logging in to Docker Hub..."

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login \
                            -u "$DOCKER_USER" \
                            --password-stdin
                    '''
                }

                echo "✅ Docker Hub login successful"
            }
        }


        // ==========================================
        // 3. BUILD IMAGE
        // ==========================================
        stage('Build Image') {
            steps {
                echo "🐳 Building Docker image..."

                sh '''
                    docker build \
                        -t $IMAGE_NAME:$IMAGE_TAG \
                        .
                '''

                echo "✅ Docker image built successfully"
                echo "📦 Image: $IMAGE_NAME:$IMAGE_TAG"
            }
        }


        // ==========================================
        // 4. TRIVY SECURITY SCAN
        // ==========================================
        stage('Trivy Security Scan') {
            steps {
                echo "🔐 Scanning Docker image with Trivy..."

                sh '''
                    trivy image \
                        --severity HIGH,CRITICAL \
                        --exit-code 1 \
                        --no-progress \
                        $IMAGE_NAME:$IMAGE_TAG
                '''

                echo "✅ Trivy security scan passed"
                echo "🔐 No HIGH or CRITICAL vulnerabilities found"
            }
        }


        // ==========================================
        // 5. VERIFY IMAGE
        // ==========================================
        stage('Verify Image') {
            steps {
                echo "🔍 Verifying Docker image..."

                sh '''
                    docker image inspect \
                        $IMAGE_NAME:$IMAGE_TAG \
                        > /dev/null
                '''

                echo "✅ Docker image verified"
            }
        }


        // ==========================================
        // 6. PUSH IMAGE TO DOCKER HUB
        // ==========================================
        stage('Push Image to DockerHub') {
            steps {
                echo "📤 Pushing image to Docker Hub..."

                sh '''
                    docker push \
                        $IMAGE_NAME:$IMAGE_TAG
                '''

                echo "✅ Image pushed successfully"
                echo "📦 Docker Image: $IMAGE_NAME:$IMAGE_TAG"
            }
        }


        // ==========================================
        // 7. DEPLOY CONTAINER
        // ==========================================
        stage('Run Container') {
            steps {
                echo "🚀 Deploying application..."

                sh '''
                    echo "Stopping old container..."

                    docker stop $CONTAINER_NAME || true

                    echo "Removing old container..."

                    docker rm $CONTAINER_NAME || true

                    echo "Starting new container..."

                    docker run -d \
                        --name $CONTAINER_NAME \
                        -p $APP_PORT:80 \
                        $IMAGE_NAME:$IMAGE_TAG

                    echo "Waiting for container to start..."

                    sleep 5
                '''

                echo "✅ Container deployed successfully"
            }
        }


        // ==========================================
        // 8. HEALTH CHECK
        // ==========================================
        stage('Health Check') {
            steps {
                echo "❤️ Checking application health..."

                sh '''
                    echo "Checking container status..."

                    STATUS=$(docker inspect \
                        --format='{{.State.Status}}' \
                        $CONTAINER_NAME)

                    echo "Container status: $STATUS"

                    if [ "$STATUS" != "running" ]; then
                        echo "❌ Container is not running!"

                        docker logs $CONTAINER_NAME

                        exit 1
                    fi

                    echo "✅ Container is running."

                    echo "Checking HTTP response..."

                    for i in 1 2 3 4 5; do

                        if curl -f http://localhost:$APP_PORT \
                            > /dev/null 2>&1; then

                            echo "✅ Application is healthy!"

                            exit 0
                        fi

                        echo "⏳ Application not ready yet... attempt $i/5"

                        sleep 3

                    done

                    echo "❌ Health check failed!"

                    echo "Container logs:"

                    docker logs $CONTAINER_NAME

                    exit 1
                '''
            }
        }
    }


    // ==========================================
    // POST ACTIONS
    // ==========================================
    post {

        // ==========================================
        // SUCCESS EMAIL
        // ==========================================
        success {
            script {

                try {

                    emailext(
                        to: '4king2will0@gmail.com',

                        subject: "✅ Jenkins SUCCESS - ${env.JOB_NAME} #${env.BUILD_NUMBER}",

                        body: """
==========================================
       🚀 CI/CD PIPELINE SUCCESS
==========================================

Build Status : SUCCESS ✅

Job:
${env.JOB_NAME}

Build:
#${env.BUILD_NUMBER}

Docker Image:
${IMAGE_NAME}:${IMAGE_TAG}

Container:
${CONTAINER_NAME}

Application Port:
${APP_PORT}

Build URL:
${env.BUILD_URL}

==========================================

Pipeline completed successfully.

✔ Source code checked out
✔ Docker image built
✔ Trivy security scan passed
✔ Docker image verified
✔ Image pushed to Docker Hub
✔ Container deployed
✔ Health check passed

==========================================
Generated by Jenkins
==========================================
""",

                        attachLog: false
                    )

                    echo "📧 Success email sent successfully"

                } catch (e) {

                    echo "⚠️ Success email failed: ${e.getMessage()}"
                }
            }
        }


        // ==========================================
        // FAILURE EMAIL
        // ==========================================
        failure {
            script {

                try {

                    emailext(
                        to: '4king2will0@gmail.com',

                        subject: "❌ Jenkins FAILED - ${env.JOB_NAME} #${env.BUILD_NUMBER}",

                        body: """
==========================================
       ❌ CI/CD PIPELINE FAILED
==========================================

Build Status : FAILED ❌

Job:
${env.JOB_NAME}

Build:
#${env.BUILD_NUMBER}

Docker Image:
${IMAGE_NAME}:${IMAGE_TAG}

Build URL:
${env.BUILD_URL}

Console Logs:
${env.BUILD_URL}console

==========================================

The Jenkins pipeline has failed.

Possible reasons:

❌ Docker build failure
❌ Trivy security scan failure
❌ Docker Hub push failure
❌ Container deployment failure
❌ Application health check failure

Please open the Jenkins console output
to identify the failed stage.

==========================================
Generated by Jenkins
==========================================
""",

                        attachLog: true
                    )

                    echo "📧 Failure email sent successfully"

                } catch (e) {

                    echo "⚠️ Failure email failed: ${e.getMessage()}"
                }
            }
        }


        // ==========================================
        // ALWAYS
        // ==========================================
        always {

            echo ""

            echo "=========================================="
            echo "📦 PIPELINE EXECUTION COMPLETED"
            echo "=========================================="

            echo "Job       : ${env.JOB_NAME}"
            echo "Build     : #${env.BUILD_NUMBER}"
            echo "Image     : ${IMAGE_NAME}:${IMAGE_TAG}"
            echo "Container : ${CONTAINER_NAME}"

            echo "=========================================="
        }
    }
}
