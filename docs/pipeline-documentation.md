# Jenkins CI/CD Pipeline Documentation

## 1. Project Overview

This project demonstrates a Jenkins-based CI/CD pipeline for automatically building, testing, packaging, containerizing, and publishing a Node.js application.

The pipeline integrates:

* GitHub
* Jenkins
* Node.js
* Docker
* Docker Hub

The application source code is stored in GitHub, Jenkins retrieves the source code, performs automated testing, builds a Docker image, and pushes the versioned image to Docker Hub.

---

## 2. Project Architecture

```text
Developer
    |
    v
GitHub Repository
    |
    | Source Code + Jenkinsfile
    v
Jenkins
    |
    +--> Checkout
    |
    +--> Build
    |
    +--> Test
    |
    +--> Package
    |
    +--> Docker Build
    |
    +--> Docker Push
    |
    v
Docker Hub
    |
    v
Versioned Docker Image
```

---

## 3. GitHub Repository

Repository:

```text
https://github.com/Narinder-code17/Jenkins-CI-CD-Docker-Pipeline
```

The repository contains the application source code, Docker configuration, Jenkinsfile, automated tests, documentation, and screenshots.

---

## 4. Project Structure

```text
Jenkins-CI-CD-Docker-Pipeline/
│
├── Jenkinsfile
├── Dockerfile
├── .dockerignore
├── .gitignore
├── README.md
│
├── app/
│   └── server.js
│
├── tests/
│   └── app.test.js
│
├── docs/
│   ├── deployment-strategies.md
│   └── pipeline-documentation.md
│
└── screenshots/
    ├── 01-prerequisites.png
    ├── 02-application-running.png
    ├── 03-automated-test.png
    ├── 04-docker-image-local.png
    ├── 05-docker-container-running.png
    ├── 06-github-repository.png
    ├── 07-jenkins-pipeline-success.png
    ├── 08-jenkins-build-success.png
    └── 09-dockerhub-image.png
```

---

# 5. Jenkins Pipeline Stages

The Jenkinsfile defines the following stages.

## Stage 1: Checkout

The Checkout stage retrieves the latest source code from the configured GitHub repository.

```groovy
stage('Checkout') {
    steps {
        echo 'Checking out source code from GitHub...'
        checkout scm
    }
}
```

Jenkins uses the configured GitHub credentials to access the repository.

---

## Stage 2: Build

The Build stage installs the Node.js project dependencies.

```groovy
stage('Build') {
    steps {
        echo 'Installing Node.js project dependencies...'
        bat 'npm install'
    }
}
```

This ensures that the application environment is prepared before testing and packaging.

---

## Stage 3: Test

The Test stage executes the automated tests.

```groovy
stage('Test') {
    steps {
        echo 'Running automated tests...'
        bat 'npm test'
    }
}
```

The project uses Node.js's built-in test runner.

The automated test suite verifies:

1. The application's default port configuration.
2. The application's environment configuration.

The successful Jenkins build reported:

```text
2 tests
2 pass
0 fail
```

---

## Stage 4: Package

The Package stage creates an npm package archive.

```groovy
stage('Package') {
    steps {
        echo 'Packaging the Node.js application...'
        bat 'npm pack'
    }
}
```

The generated package is:

```text
jenkins-ci-cd-docker-pipeline-1.0.0.tgz
```

---

## Stage 5: Docker Build

The Docker Build stage creates a Docker image from the application's Dockerfile.

```groovy
stage('Docker Build') {
    steps {
        echo 'Building Docker image...'
        bat 'docker build -t %DOCKER_IMAGE%:%DOCKER_TAG% .'
    }
}
```

The image uses the Jenkins build number as its tag.

For Build #5:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

This provides a unique image version for each successful pipeline execution.

---

## Stage 6: Docker Push

The Docker Push stage authenticates with Docker Hub and pushes the Docker image.

```groovy
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
```

The Docker Hub credentials are stored securely in Jenkins rather than directly inside the Jenkinsfile.

The credential ID used by the pipeline is:

```text
dockerhub-credentials
```

---

# 6. Environment Variables

The Jenkinsfile defines environment variables for the pipeline.

```groovy
environment {
    PATH = "C:\\Program Files\\nodejs;${env.PATH}"
    APP_NAME = 'jenkins-ci-cd-docker-pipeline'
    DOCKER_IMAGE = 'narinder15/jenkins-ci-cd-docker-pipeline'
    DOCKER_TAG = "${BUILD_NUMBER}"
    NODE_ENV = 'production'
    APP_PORT = '3005'
}
```

Important variables include:

| Variable       | Purpose                                  |
| -------------- | ---------------------------------------- |
| `APP_NAME`     | Application name                         |
| `DOCKER_IMAGE` | Docker Hub image repository              |
| `DOCKER_TAG`   | Uses Jenkins build number                |
| `NODE_ENV`     | Application environment                  |
| `APP_PORT`     | Application port                         |
| `PATH`         | Allows Jenkins to locate Node.js and npm |

---

# 7. Docker Configuration

The Dockerfile uses Node.js 22 Alpine as the base image.

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

COPY app ./app

COPY tests ./tests

ENV NODE_ENV=production
ENV PORT=3005

EXPOSE 3005

CMD ["node", "app/server.js"]
```

The application exposes port `3005`.

A local Docker test was performed using:

```text
Host Port: 3006
Container Port: 3005
```

The application successfully ran inside the Docker container.

---

# 8. Jenkins Build Result

The successful Jenkins execution was **Build #5**.

The pipeline completed all stages successfully:

```text
Checkout        → SUCCESS
Build           → SUCCESS
Test            → SUCCESS
Package         → SUCCESS
Docker Build    → SUCCESS
Docker Push     → SUCCESS
```

The automated tests reported:

```text
2 tests
2 pass
0 fail
```

The Docker image was successfully pushed to Docker Hub as:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

The pipeline ended with:

```text
Finished: SUCCESS
```

---

# 9. Security Considerations

Docker Hub authentication is handled using Jenkins Credentials.

The Docker Hub access token is not stored directly in the Jenkinsfile.

The pipeline uses:

```groovy
withCredentials(...)
```

to temporarily provide the credential values to the Docker login command.

After pushing the image, the pipeline executes:

```text
docker logout
```

This removes the Docker authentication session from the Jenkins environment.

---

# 10. CI/CD Workflow Summary

The complete workflow is:

```text
1. Developer pushes code to GitHub
            |
            v
2. Jenkins checks out the repository
            |
            v
3. npm install
            |
            v
4. Automated tests
            |
            v
5. npm pack
            |
            v
6. Docker image build
            |
            v
7. Docker Hub authentication
            |
            v
8. Docker image push
            |
            v
9. Docker logout
```

This demonstrates an automated CI/CD workflow in which source code is converted into a tested and versioned Docker image.

---

# 11. Final Docker Image

The successful Jenkins pipeline produced:

```text
Repository:
narinder15/jenkins-ci-cd-docker-pipeline

Tag:
5

Complete image:
narinder15/jenkins-ci-cd-docker-pipeline:5
```

The image was successfully pushed to Docker Hub by Jenkins.

---

# 12. Conclusion

This project demonstrates the implementation of a Jenkins CI/CD pipeline integrated with GitHub and Docker Hub.

The pipeline automatically performs source checkout, application build, automated testing, packaging, Docker image creation, and Docker image publishing.

The successful Build #5 confirms that the complete workflow is operational and that Jenkins can securely authenticate with Docker Hub and publish the generated container image.
