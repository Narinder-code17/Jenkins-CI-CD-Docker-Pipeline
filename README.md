# Jenkins CI/CD Docker Pipeline

A complete CI/CD pipeline implementation using **Jenkins, GitHub, Node.js, Docker, and Docker Hub**.

The project demonstrates how source code can be automatically checked out from GitHub, built, tested, packaged, containerized using Docker, and pushed to Docker Hub through a Jenkins Declarative Pipeline.

---

## 📌 Project Overview

This project implements an automated CI/CD workflow for a simple Node.js web application.

The pipeline is designed to perform the following operations:

1. Checkout source code from GitHub
2. Install project dependencies
3. Run automated tests
4. Package the application
5. Build a Docker image
6. Authenticate with Docker Hub
7. Push the Docker image to Docker Hub
8. Logout from Docker Hub

The Docker image is versioned automatically using the Jenkins build number.

For example:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

---

## 🎯 Objectives

The main objectives of this project are:

* Set up Jenkins locally on Windows
* Integrate Jenkins with GitHub
* Create a Declarative Jenkins Pipeline
* Implement Checkout, Build, Test, and Package stages
* Build a Docker image through Jenkins
* Push the Docker image to Docker Hub
* Configure Jenkins environment variables
* Configure secure Jenkins credentials
* Implement an automated test stage
* Understand Blue-Green Deployment
* Understand Rolling Deployment
* Demonstrate an end-to-end CI/CD workflow

---

## 🏗️ CI/CD Architecture

```text
                    Developer
                        |
                        v
                +----------------+
                |     GitHub     |
                | Source Code    |
                |  + Jenkinsfile |
                +-------+--------+
                        |
                        | Git Checkout
                        v
                +----------------+
                |     Jenkins    |
                |                |
                |  Checkout      |
                |      ↓         |
                |  Build         |
                |      ↓         |
                |  Test          |
                |      ↓         |
                |  Package       |
                |      ↓         |
                |  Docker Build  |
                |      ↓         |
                |  Docker Push   |
                +-------+--------+
                        |
                        | Docker Image
                        v
                +----------------+
                |   Docker Hub   |
                |                |
                | Versioned Image|
                +----------------+
```

---

## 🛠️ Technologies Used

| Technology | Purpose                                   |
| ---------- | ----------------------------------------- |
| Jenkins    | CI/CD automation                          |
| GitHub     | Source code management                    |
| Git        | Version control                           |
| Node.js    | Application runtime                       |
| npm        | Dependency management and packaging       |
| Docker     | Application containerization              |
| Docker Hub | Container image registry                  |
| Groovy     | Jenkinsfile pipeline syntax               |
| Windows 11 | Local development and Jenkins environment |

---

## 📂 Project Structure

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

# 🚀 Application

The project contains a simple Node.js HTTP application.

The application displays:

* Jenkins CI/CD Pipeline
* Deployment status
* Current application environment

The application uses environment variables to configure the port and environment.

### Application Port

```text
3005
```

### Environment

The Docker image runs the application using:

```text
NODE_ENV=production
```

---

# ⚙️ Jenkins Pipeline

The CI/CD pipeline is defined in:

```text
Jenkinsfile
```

The pipeline uses Jenkins Declarative Pipeline syntax.

## Pipeline Stages

```text
Checkout
   ↓
Build
   ↓
Test
   ↓
Package
   ↓
Docker Build
   ↓
Docker Push
```

---

## 1. Checkout Stage

The Checkout stage retrieves the source code from the GitHub repository.

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

## 2. Build Stage

The Build stage installs the Node.js project dependencies.

```groovy
stage('Build') {
    steps {
        echo 'Installing Node.js project dependencies...'
        bat 'npm install'
    }
}
```

---

## 3. Test Stage

The Test stage executes the automated test suite.

```groovy
stage('Test') {
    steps {
        echo 'Running automated tests...'
        bat 'npm test'
    }
}
```

The project uses Node.js's built-in test runner.

The test suite verifies:

* Application default port configuration
* Application environment configuration

Successful Jenkins execution:

```text
2 tests
2 pass
0 fail
```

---

## 4. Package Stage

The Package stage creates an npm package archive.

```groovy
stage('Package') {
    steps {
        echo 'Packaging the Node.js application...'
        bat 'npm pack'
    }
}
```

Generated package:

```text
jenkins-ci-cd-docker-pipeline-1.0.0.tgz
```

---

## 5. Docker Build Stage

Jenkins builds a Docker image using the project's Dockerfile.

```groovy
stage('Docker Build') {
    steps {
        echo 'Building Docker image...'
        bat 'docker build -t %DOCKER_IMAGE%:%DOCKER_TAG% .'
    }
}
```

The Docker image is automatically tagged using the Jenkins build number.

For Build #5:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

---

## 6. Docker Push Stage

The Docker Push stage authenticates with Docker Hub and pushes the generated image.

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

The Docker Hub credentials are stored securely in Jenkins Credentials instead of being written directly into the Jenkinsfile.

---

# 🔐 Environment Variables

The Jenkinsfile contains the following environment variables:

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

### Environment Variable Description

| Variable       | Description                              |
| -------------- | ---------------------------------------- |
| `PATH`         | Allows Jenkins to locate Node.js and npm |
| `APP_NAME`     | Application name                         |
| `DOCKER_IMAGE` | Docker Hub image repository              |
| `DOCKER_TAG`   | Jenkins build number used as image tag   |
| `NODE_ENV`     | Application environment                  |
| `APP_PORT`     | Application port                         |

---

# 🐳 Docker Implementation

The application is containerized using Docker.

## Dockerfile

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

### Docker Configuration

| Configuration     | Value                |
| ----------------- | -------------------- |
| Base Image        | `node:22-alpine`     |
| Working Directory | `/app`               |
| Application Port  | `3005`               |
| Environment       | `production`         |
| Startup Command   | `node app/server.js` |

---

# 🧪 Automated Testing

The project uses Node.js's built-in test runner.

Test file:

```text
tests/app.test.js
```

Tests included:

### Test 1

Verifies that the application uses the expected default port:

```text
3005
```

### Test 2

Verifies that the application environment has a valid value:

```text
development
test
production
```

### Successful Test Result

```text
2 tests
2 pass
0 fail
```

---

# 🔑 Jenkins Credentials

Two credentials are used by Jenkins.

## GitHub Credential

Credential ID:

```text
github-jenkins-credential
```

Purpose:

```text
GitHub repository authentication
```

## Docker Hub Credential

Credential ID:

```text
dockerhub-credentials
```

Purpose:

```text
Docker Hub authentication for image push
```

The Docker Hub Personal Access Token is stored securely in Jenkins Credentials and is not included in the source code.

---

# 📦 Docker Image

The Docker image generated by Jenkins is:

```text
narinder15/jenkins-ci-cd-docker-pipeline
```

The Jenkins build number is used as the image tag.

For the successful Build #5:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

This provides a versioned Docker image for each Jenkins pipeline execution.

---

# ✅ Successful Pipeline Execution

The successful Jenkins execution was:

```text
Build #5
```

All pipeline stages completed successfully:

```text
Checkout       → SUCCESS
Build          → SUCCESS
Test           → SUCCESS
Package        → SUCCESS
Docker Build   → SUCCESS
Docker Push    → SUCCESS
```

Automated test result:

```text
2 tests
2 pass
0 fail
```

Docker image:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

Final Jenkins result:

```text
Finished: SUCCESS
```

---

# 🌐 GitHub Repository

GitHub repository:

```text
https://github.com/Narinder-code17/Jenkins-CI-CD-Docker-Pipeline
```

The repository contains:

* Application source code
* Jenkinsfile
* Dockerfile
* Automated tests
* Deployment strategy documentation
* Pipeline documentation
* Project screenshots
* Configuration files

---

# 🐳 Docker Hub Repository

Docker Hub repository:

```text
https://hub.docker.com/r/narinder15/jenkins-ci-cd-docker-pipeline
```

The successful Jenkins pipeline published:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

---

# 🔄 Deployment Strategies

This project also studies two commonly used deployment strategies.

## Blue-Green Deployment

Blue-Green Deployment maintains two separate environments:

```text
Blue  → Current production version
Green → New application version
```

The new version is deployed and tested in the inactive environment before production traffic is switched.

### Key Characteristics

* Two environments
* Controlled traffic switching
* Quick rollback by switching traffic back
* Higher infrastructure requirements

---

## Rolling Deployment

Rolling Deployment gradually replaces instances running the old version with instances running the new version.

Example:

```text
Version 1 → Version 1 → Version 1 → Version 1

        ↓ Gradual replacement

Version 2 → Version 2 → Version 2 → Version 2
```

### Key Characteristics

* Gradual replacement
* Old and new versions may temporarily coexist
* Lower infrastructure requirements than maintaining two complete environments
* Requires controlled rollout and compatibility between versions

Detailed explanations are available in:

```text
docs/deployment-strategies.md
```

---

# 🔒 Security Considerations

The project follows basic CI/CD security practices:

* Docker Hub credentials are stored in Jenkins Credentials.
* Docker Hub Personal Access Token is used for CI/CD authentication.
* Credentials are not hard-coded in the Jenkinsfile.
* Jenkins `withCredentials` is used to inject secrets during execution.
* Docker logout is executed after pushing the image.
* Sensitive credentials are excluded from Git commits.

---

# 📋 CI/CD Workflow

The complete workflow is:

```text
Developer
    |
    v
GitHub
    |
    v
Jenkins
    |
    +---- Checkout
    |
    +---- Build
    |
    +---- Test
    |
    +---- Package
    |
    +---- Docker Build
    |
    +---- Docker Push
    |
    v
Docker Hub
    |
    v
Versioned Docker Image
```

---

# 📚 Documentation

Additional project documentation is available in the `docs` directory.

### Deployment Strategies

```text
docs/deployment-strategies.md
```

Contains:

* Blue-Green Deployment
* Rolling Deployment
* Working principles
* Advantages
* Limitations
* Comparison
* Relationship with Jenkins and Docker

### Pipeline Documentation

```text
docs/pipeline-documentation.md
```

Contains:

* Pipeline architecture
* Jenkins stages
* Environment variables
* Docker configuration
* Credentials
* Test results
* Successful pipeline execution
* CI/CD workflow

---

# 🏁 Conclusion

This project demonstrates an end-to-end Jenkins CI/CD pipeline integrated with GitHub and Docker Hub.

The pipeline automatically:

```text
Checkout
   ↓
Build
   ↓
Test
   ↓
Package
   ↓
Docker Build
   ↓
Docker Push
```

The successful Jenkins Build #5 confirms that the application can be automatically tested, packaged, containerized, and published as a versioned Docker image.

The project provides practical experience with CI/CD automation, Jenkins Declarative Pipelines, GitHub integration, Docker containerization, secure credentials management, automated testing, Docker Hub publishing, and deployment strategies.
