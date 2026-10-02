# Jenkins CI/CD Docker Pipeline

A complete CI/CD and DevSecOps pipeline implementation using **Jenkins, GitHub, Node.js, Docker, Docker Hub, and Docker Scout**.

The project demonstrates how source code can be automatically checked out from GitHub, built, tested, packaged, containerized, security-scanned, pushed to Docker Hub, securely deployed, and automatically verified through a health check.

The project also demonstrates **Docker container hardening, dependency security auditing, vulnerability remediation, Linux security checks, secure credentials management, and production-readiness improvements**.

---

## 📌 Project Overview

This project implements an automated CI/CD workflow for a Node.js web application.

The final Jenkins pipeline performs:

1. Checkout source code from GitHub
2. Install project dependencies using `npm ci`
3. Run automated tests
4. Package the application
5. Build the Docker image
6. Perform Docker Scout security scanning
7. Push the image to Docker Hub
8. Deploy the tested image securely
9. Perform an automated application health check

The Docker image is versioned automatically using the Jenkins build number.

### Final Successful Jenkins Build

```text
Jenkins Build: #21
Docker Image: narinder15/jenkins-ci-cd-docker-pipeline:21
Pipeline Status: SUCCESS
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
* Implement automated application testing
* Implement Docker image vulnerability scanning
* Apply Docker container hardening
* Apply basic Linux security checks
* Identify and remediate container vulnerabilities
* Automate secure Docker deployment
* Automate application health verification
* Understand Blue-Green Deployment
* Understand Rolling Deployment
* Apply DevSecOps practices to the CI/CD workflow
* Perform a production-readiness review

---

# 🏗️ CI/CD and DevSecOps Architecture

```text
                    Developer
                        |
                        v
                +---------------+
                |    GitHub      |
                | Source Code    |
                |  Jenkinsfile   |
                +-------+-------+
                        |
                        | Git Checkout
                        v
                +---------------+
                |    Jenkins     |
                +-------+-------+
                        |
                        v
                    Checkout
                        |
                        v
                      Build
                        |
                        v
                      Test
                        |
                        v
                    Package
                        |
                        v
                  Docker Build
                        |
                        v
                Docker Scout Scan
                  /            \
               FAIL            PASS
                |                |
                v                v
          Pipeline Stops     Docker Push
                                  |
                                  v
                             Docker Hub
                                  |
                                  v
                         Secure Deployment
                                  |
                                  v
                          Health Check
                           /         \
                        PASS         FAIL
                         |             |
                         v             v
                      SUCCESS      Pipeline
                                    Failed
```

---

# 🛠️ Technologies Used

| Technology     | Purpose                                   |
| -------------- | ----------------------------------------- |
| Jenkins        | CI/CD automation                          |
| GitHub         | Source code management                    |
| Git            | Version control                           |
| Node.js        | Application runtime                       |
| npm            | Dependency management and packaging       |
| Docker         | Application containerization              |
| Docker Compose | Secure container configuration            |
| Docker Scout   | Container vulnerability scanning          |
| Docker Hub     | Container image registry                  |
| Groovy         | Jenkinsfile pipeline syntax               |
| WSL Ubuntu     | Linux security checks                     |
| Windows        | Local development and Jenkins environment |

---

# 📂 Project Structure

```text
Jenkins-CI-CD-Docker-Pipeline/
│
├── Jenkinsfile
├── Dockerfile
├── compose.yaml
├── package.json
├── package-lock.json
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
│   ├── pipeline-documentation.md
│   ├── security-scan-report.md
│   ├── devsecops-improvement-report.md
│   ├── sdlc-devsecops.md
│   ├── devops-resume.md
│   ├── devops-interview-preparation.md
│   └── production-readiness-review.md
│
├── screenshots/
│   ├── 01-prerequisites.png
│   ├── 02-application-running.png
│   ├── 03-automated-test.png
│   ├── 04-docker-image-local.png
│   ├── 05-docker-container-running.png
│   ├── 06-github-repository.png
│   ├── 07-jenkins-pipeline-success.png
│   ├── 08-jenkins-build-success.png
│   ├── 09-dockerhub-image.png
│   ├── 10-secure-compose-deployment.png
│   ├── 11-linux-patching-status.png
│   ├── 12-file-permission-check.png
│   ├── 13-root-account-status.png
│   ├── 14-security-scan-before.png
│   ├── 15-secure-deployment-final.png
│   ├── 16-production-readiness-before.png
│   ├── 17-production-readiness-after.png
│   └── 18-production-readiness-final.png
│
├── npm-audit-report.txt
├── security-scan-before.txt
└── security-scan-after.txt
```

---

# 🚀 Application

The project contains a simple Node.js HTTP application.

The application displays:

* Jenkins CI/CD Pipeline
* Deployment status
* Current application environment

### Application Port

```text
3005
```

### Production Environment

```text
NODE_ENV=production
```

The application uses environment variables for the port and runtime environment.

---

# ⚙️ Jenkins Pipeline

The CI/CD pipeline is defined in:

```text
Jenkinsfile
```

The pipeline uses Jenkins Declarative Pipeline syntax.

## Final Pipeline Stages

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
Security Scan
   ↓
Docker Push
   ↓
Deploy
   ↓
Health Check
```

---

## 1. Checkout Stage

The Checkout stage retrieves source code from the GitHub repository.

```groovy
stage('Checkout') {
    steps {
        echo 'Checking out source code from GitHub...'
        checkout scm
    }
}
```

---

## 2. Build Stage

The Build stage installs project dependencies using the lock file.

```groovy
stage('Build') {
    steps {
        echo 'Installing Node.js project dependencies...'
        bat 'npm ci'
    }
}
```

Using `npm ci` provides a reproducible dependency installation based on `package-lock.json`.

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

Final result:

```text
2 tests
2 passed
0 failed
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

Jenkins builds the Docker image using the project's Dockerfile.

```groovy
stage('Docker Build') {
    steps {
        echo 'Building Docker image...'
        bat 'docker build -t %DOCKER_IMAGE%:%DOCKER_TAG% .'
    }
}
```

The image tag is generated from the Jenkins build number.

For the final successful pipeline:

```text
narinder15/jenkins-ci-cd-docker-pipeline:21
```

---

## 6. Security Scan Stage

Docker Scout is used as a DevSecOps security gate.

The pipeline authenticates with Docker Hub using Jenkins credentials before performing the scan.

The scan checks Critical and High severity vulnerabilities.

```text
Docker Build
     ↓
Docker Scout Scan
     ↓
Critical/High vulnerabilities?
     ↓
   No → Continue
   Yes → Pipeline fails
```

Final Build #21 security result:

```text
Critical: 0
High:     0
Medium:   0
Low:      0
```

---

## 7. Docker Push Stage

The Docker Push stage authenticates with Docker Hub and pushes the generated image.

Docker Hub credentials are stored securely in Jenkins Credentials.

The image pushed by the final successful build was:

```text
narinder15/jenkins-ci-cd-docker-pipeline:21
```

---

## 8. Deploy Stage

The final Jenkins pipeline automatically deploys the Docker image using the Docker CLI.

The deployment uses the exact image that was built, security-scanned, and pushed during the same pipeline execution.

Security controls include:

```text
--user node
--read-only
--security-opt no-new-privileges:true
--cap-drop ALL
-p 127.0.0.1:3006:3005
--restart unless-stopped
```

This provides:

* Non-root execution
* Read-only filesystem
* Dropped Linux capabilities
* Protection against privilege escalation
* Localhost-only port exposure
* Automatic container restart

---

## 9. Health Check Stage

After deployment, Jenkins automatically verifies that the application is responding.

The health check uses:

```text
http://127.0.0.1:3006
```

The pipeline retries the request when necessary and expects HTTP status `200`.

Final Build #21 result:

```text
Health check passed on attempt 1
```

This prevents Jenkins from reporting a successful deployment when the container is running but the application is not responding correctly.

---

# 🔐 Environment Variables

The Jenkinsfile contains:

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

# Remove package managers not required at runtime
RUN rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/lib/node_modules/corepack \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /usr/local/bin/corepack

CMD ["node", "app/server.js"]
```

## Docker Security Improvement

The application only requires the Node.js runtime when running in production.

npm, npx, and Corepack are not required by the application at runtime. They were therefore removed from the runtime image to reduce the software footprint and attack surface.

This remediation reduced the Docker Scout vulnerability findings from:

```text
19 detected vulnerabilities
```

to:

```text
0 detected vulnerabilities
```

---

# 🔒 Docker Compose Security Configuration

The project also contains:

```text
compose.yaml
```

The current configuration includes:

```yaml
services:
  app:
    image: "${DOCKER_IMAGE}:${DOCKER_TAG}"
    container_name: jenkins-cicd-secure-app

    ports:
      - "127.0.0.1:3006:3005"

    environment:
      NODE_ENV: production
      PORT: 3005

    user: "node"
    read_only: true

    security_opt:
      - no-new-privileges:true

    cap_drop:
      - ALL

    restart: unless-stopped
```

### Security Controls

| Control                   | Purpose                                  |
| ------------------------- | ---------------------------------------- |
| `user: node`              | Runs application as a non-root user      |
| `read_only: true`         | Makes the container filesystem read-only |
| `cap_drop: ALL`           | Removes unnecessary Linux capabilities   |
| `no-new-privileges:true`  | Prevents privilege escalation            |
| `127.0.0.1` binding       | Restricts host access to localhost       |
| `restart: unless-stopped` | Provides automatic container restart     |

> **Note:** Docker Compose was used during the earlier secure-deployment validation. The final automated Jenkins deployment uses the Docker CLI with equivalent security controls because the Jenkins environment encountered a Docker Compose command compatibility issue.

---

# 🧪 Automated Testing

The project uses Node.js's built-in test runner.

Test file:

```text
tests/app.test.js
```

Tests verify:

1. The application uses the expected default port.
2. The application environment has a valid value.

Final pipeline result:

```text
2 tests
2 passed
0 failed
```

---

# 🔍 Security Scanning

Security scanning was performed using **Docker Scout**.

## Initial Image Scan

Initial image:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

Initial result:

```text
Critical: 0
High:     10
Medium:   8
Low:      1
Total:    19
```

The result was saved as:

```text
security-scan-before.txt
```

---

## Application Dependency Audit

The application dependency set was checked using npm audit.

Result:

```text
found 0 vulnerabilities
```

The result was saved as:

```text
npm-audit-report.txt
```

---

# 🛡️ Security Remediation

The vulnerability investigation identified vulnerabilities associated with software included in the original container runtime image.

The production Dockerfile was hardened by removing unnecessary runtime package-management components:

```text
npm
npx
Corepack
```

The Node.js runtime was retained.

A hardened image was subsequently built and scanned.

---

# ✅ Security Scan After Remediation

The hardened image was scanned again using Docker Scout.

Result:

```text
Critical: 0
High:     0
Medium:   0
Low:      0
Total:    0
```

The final scan was saved as:

```text
security-scan-after.txt
```

### Before vs After

| Severity | Before `:5` | After `:6` |
| -------- | ----------: | ---------: |
| Critical |           0 |          0 |
| High     |          10 |          0 |
| Medium   |           8 |          0 |
| Low      |           1 |          0 |
| Total    |          19 |          0 |

---

# 🐧 Linux Hardening

Basic Linux security checks were performed in WSL Ubuntu.

## System Updates

The system package list was updated and available upgrades were installed.

Some packages were held back because of normal phased updates and were not force-installed.

## Network Service Review

Listening network ports were reviewed using:

```text
sudo ss -tulpn
```

Services were reviewed before making changes. Unknown listeners were not disabled blindly.

## Running Services Review

Running services were reviewed using:

```text
systemctl --type=service --state=running --no-pager
```

No service was disabled without confirming that it was unnecessary.

## File Permission Check

World-writable files in the reviewed home-directory scope were checked.

Result:

```text
No world-writable files found
```

## Root Account Check

The root account was checked using:

```text
sudo passwd -S root
```

The root account was reported as locked.

---

# 🔑 Jenkins Credentials

Two main credentials are used by Jenkins.

## GitHub Credential

```text
github-jenkins-credential
```

Purpose:

```text
GitHub repository authentication
```

## Docker Hub Credential

```text
dockerhub-credentials
```

Purpose:

```text
Docker Hub authentication
```

Credentials are stored in Jenkins Credentials and are not hard-coded into the source code.

---

# 📦 Docker Images

## Earlier Jenkins Image

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

This image was used for the initial vulnerability scan.

## Hardened Image

```text
narinder15/jenkins-ci-cd-docker-pipeline:6
```

This image was used to verify the Docker security remediation.

## Final Jenkins Deployment Image

```text
narinder15/jenkins-ci-cd-docker-pipeline:21
```

This image was built, security-scanned, pushed, deployed, and verified by the final successful Jenkins Build #21.

---

# 🚀 Production Readiness Improvements

The production-readiness review identified several automation, security, and reliability gaps.

### Improvements Implemented

1. Docker Scout security scanning was integrated as a pipeline gate.
2. Docker Hub authentication was securely handled using Jenkins credentials.
3. Deployment was automated through Jenkins.
4. Docker image tagging was tied to the Jenkins build number.
5. The exact tested and scanned image is deployed.
6. Container runtime hardening was enforced.
7. Application health verification was automated.
8. The pipeline fails when the health check fails.
9. Production-readiness evidence and documentation were added.

### Final Pipeline

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
Security Scan
   ↓
Docker Push
   ↓
Secure Deploy
   ↓
Health Check
   ↓
SUCCESS
```

Detailed review:

```text
docs/production-readiness-review.md
```

---

# 🔄 Deployment Strategies

This project also studies two commonly used deployment strategies.

## Blue-Green Deployment

Blue-Green Deployment maintains two environments:

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

```text
Version 1 → Version 1 → Version 1 → Version 1
                    ↓
             Gradual replacement
                    ↓
Version 2 → Version 2 → Version 2 → Version 2
```

### Key Characteristics

* Gradual replacement
* Old and new versions may temporarily coexist
* Lower infrastructure requirements than maintaining two complete environments
* Requires controlled rollout and compatibility between versions

Detailed explanation:

```text
docs/deployment-strategies.md
```

---

# 🔐 DevSecOps Practices Implemented

The project incorporates security throughout the CI/CD workflow.

### 1. Secure Credentials

Credentials are stored in Jenkins Credentials rather than directly in source code.

### 2. Dependency Auditing

npm auditing is used to check application dependencies.

### 3. Container Vulnerability Scanning

Docker Scout scans Docker images for known vulnerabilities.

### 4. Security Gate

The Jenkins pipeline checks Critical and High Docker Scout vulnerabilities before Docker Push.

### 5. Container Hardening

The production container:

* Runs as a non-root user
* Uses a read-only filesystem
* Drops Linux capabilities
* Prevents privilege escalation
* Uses localhost-only port binding

### 6. Linux Hardening

Basic system patching, service review, network-port review, file-permission checks, and root-account checks were performed.

### 7. Automated Deployment Verification

The application is automatically checked after deployment.

---

# 📋 Final CI/CD + DevSecOps Workflow

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
    +---- Security Scan
    |          |
    |          +---- Critical/High → Pipeline Stops
    |          |
    |          +---- Pass
    |
    +---- Docker Push
    |
    +---- Secure Deploy
    |
    +---- Health Check
    |
    v
Successful Deployment
```

---

# 🖼️ Evidence Screenshots

| Screenshot                           | Evidence                                  |
| ------------------------------------ | ----------------------------------------- |
| `01-prerequisites.png`               | Required tools and environment            |
| `02-application-running.png`         | Node.js application                       |
| `03-automated-test.png`              | Automated tests                           |
| `04-docker-image-local.png`          | Local Docker image                        |
| `05-docker-container-running.png`    | Docker container                          |
| `06-github-repository.png`           | GitHub repository                         |
| `07-jenkins-pipeline-success.png`    | Jenkins pipeline                          |
| `08-jenkins-build-success.png`       | Successful Jenkins build                  |
| `09-dockerhub-image.png`             | Docker Hub image                          |
| `10-secure-compose-deployment.png`   | Secure Compose deployment                 |
| `11-linux-patching-status.png`       | Linux package updates                     |
| `12-file-permission-check.png`       | File permission security check            |
| `13-root-account-status.png`         | Root account status                       |
| `14-security-scan-before.png`        | Initial Docker Scout scan                 |
| `15-secure-deployment-final.png`     | Earlier final secured deployment          |
| `16-production-readiness-before.png` | Production-readiness before state         |
| `17-production-readiness-after.png`  | Production-readiness after implementation |
| `18-production-readiness-final.png`  | Final successful Jenkins deployment       |

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

### Production Readiness Review

```text
docs/production-readiness-review.md
```

Contains:

* Production-readiness objective
* Before-state findings
* Security review
* Implemented improvements
* Security scan results
* Deployment verification
* Before/after comparison
* Final checklist
* Architecture/workflow diagram
* Implementation summary

---

# 🌐 GitHub Repository

```text
https://github.com/Narinder-code17/Jenkins-CI-CD-Docker-Pipeline
```

The repository contains:

* Application source code
* Jenkinsfile
* Dockerfile
* Docker Compose configuration
* Automated tests
* Security configuration
* Deployment strategy documentation
* Pipeline documentation
* Production-readiness documentation
* Security scan evidence
* Project screenshots

---

# 🐳 Docker Hub Repository

```text
https://hub.docker.com/r/narinder15/jenkins-ci-cd-docker-pipeline
```

Final Jenkins deployment image:

```text
narinder15/jenkins-ci-cd-docker-pipeline:21
```

---

# 🏁 Final Results

The final Jenkins Build #21 completed successfully.

```text
Build Dependencies       → SUCCESS
Automated Tests          → 2/2 PASSED
Docker Build             → SUCCESS
Docker Scout Security    → 0 Critical / 0 High
Docker Push              → SUCCESS
Secure Deployment        → SUCCESS
Application Health Check → PASSED
Final Pipeline           → SUCCESS
```

The final deployed image was:

```text
narinder15/jenkins-ci-cd-docker-pipeline:21
```

---

# 📊 Production Readiness Summary

| Area                        | Final Status |
| --------------------------- | ------------ |
| GitHub source control       | PASS         |
| Jenkins CI/CD               | PASS         |
| Automated build             | PASS         |
| Automated testing           | PASS         |
| Docker image build          | PASS         |
| Docker Scout security gate  | PASS         |
| Critical vulnerabilities    | 0            |
| High vulnerabilities        | 0            |
| Docker Hub push             | PASS         |
| Secure container deployment | PASS         |
| Non-root container          | PASS         |
| Read-only filesystem        | PASS         |
| Linux capabilities dropped  | PASS         |
| No-new-privileges           | PASS         |
| Localhost-only binding      | PASS         |
| Automated health check      | PASS         |
| Production-readiness review | COMPLETE     |
| Final Jenkins Build #21     | SUCCESS      |

---

# 🏁 Conclusion

This project demonstrates an end-to-end Jenkins CI/CD and DevSecOps workflow integrated with GitHub and Docker.

The final pipeline performs:

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
Security Scan
   ↓
Docker Push
   ↓
Secure Deployment
   ↓
Health Check
```

The project was extended with practical security and reliability improvements including:

* npm dependency auditing
* Docker Scout vulnerability scanning
* Docker runtime hardening
* Non-root container execution
* Read-only container filesystem
* Linux capability removal
* No-new-privileges protection
* Localhost-only deployment
* Basic Linux hardening
* Secure Jenkins credentials
* Automated Critical/High vulnerability gating
* Automated Docker deployment
* Automated application health verification
* Jenkins build-number based image versioning

The initial Docker image contained:

```text
19 detected vulnerabilities
```

After removing unnecessary runtime package-management components:

```text
0 Critical
0 High
0 Medium
0 Low
```

The final Jenkins Build #21 successfully built, scanned, pushed, deployed, and health-checked the application.

This project provides practical experience with **CI/CD automation, Jenkins Declarative Pipelines, GitHub integration, Docker containerization, Docker Compose, Docker Scout, DevSecOps, secure credentials management, automated testing, vulnerability remediation, Linux hardening, Docker Hub publishing, deployment strategies, and production-readiness practices**.
