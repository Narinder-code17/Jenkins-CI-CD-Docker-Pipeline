pipeline {

    agent any

    environment {
        APP_NAME = 'jenkins-ci-cd-docker-pipeline'
        DOCKER_IMAGE = 'narinder15/jenkins-ci-cd-docker-pipeline'
        DOCKER_TAG = "${BUILD_NUMBER}"
        NODE_ENV = 'production'
        APP_PORT = '3005'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing Node.js project dependencies...'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated tests...'
                bat 'npm test'
            }
        }

        stage('Package') {
            steps {
                echo 'Packaging the Node.js application...'
                bat 'npm pack'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                bat 'docker build -t %DOCKER_IMAGE%:%DOCKER_TAG% .'
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Logging into Docker Hub and pushing image...'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    bat 'echo %DOCKER_PASSWORD%| docker login -u %DOCKER_USERNAME% --password-stdin'
                    bat 'docker push %DOCKER_IMAGE%:%DOCKER_TAG%'
                    bat 'docker logout'
                }
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully.'
            echo "Docker image pushed: ${DOCKER_IMAGE}:${DOCKER_TAG}"
        }

        failure {
            echo 'CI/CD pipeline failed. Check the Jenkins console output.'
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}