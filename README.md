# Jenkins CI/CD Docker Pipeline

A complete CI/CD and DevSecOps pipeline implementation using **Jenkins, GitHub, Node.js, Docker, Docker Hub, Docker Compose, and Docker Scout**.

The project demonstrates how source code can be automatically checked out from GitHub, built, tested, packaged, containerized using Docker, security-scanned, and pushed to Docker Hub through a Jenkins Declarative Pipeline.

The project also demonstrates **basic Linux hardening, Docker container hardening, dependency security auditing, and vulnerability remediation**.

---

## 📌 Project Overview

This project implements an automated CI/CD workflow for a simple Node.js web application.

The original CI/CD pipeline performs:

1. Checkout source code from GitHub
2. Install project dependencies
3. Run automated tests
4. Package the application
5. Build a Docker image
6. Security scan the Docker image
7. Authenticate with Docker Hub
8. Push the Docker image to Docker Hub
9. Logout from Docker Hub

The Docker image is versioned automatically using the Jenkins build number.

Previous successful Jenkins build:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

A security-hardened image was subsequently built and verified:

```text
narinder15/jenkins-ci-cd-docker-pipeline:6
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
* Apply basic Docker container hardening
* Apply basic Linux security checks
* Identify and remediate container vulnerabilities
* Configure a secure Docker Compose deployment
* Understand Blue-Green Deployment
* Understand Rolling Deployment
* Apply DevSecOps practices to the CI/CD workflow

---

# 🏗️ CI/CD and DevSecOps Architecture

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
                | Security Scan  |
                |      ↓         |
                |  Docker Push   |
                +-------+--------+
                        |
                        | Docker Image
                        v
                +----------------+
                |   Docker Hub   |
                | Versioned Image|
                +----------------+

              Security Layer
              ───────────────
              Linux Hardening
                    +
              Docker Hardening
                    +
              npm Audit
                    +
              Docker Scout
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
| Docker Compose | Secure container deployment               |
| Docker Scout   | Container vulnerability scanning          |
| Docker Hub     | Container image registry                  |
| Groovy         | Jenkinsfile pipeline syntax               |
| WSL Ubuntu     | Linux security hardening                  |
| Windows 11     | Local development and Jenkins environment |

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
│   └── pipeline-documentation.md
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
│   └── 15-secure-deployment-final.png
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

The application uses environment variables to configure the port and environment.

### Application Port

```text
3005
```

### Environment

The production container runs:

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

## Current Pipeline Stages

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
```

The **Security Scan** stage is the DevSecOps improvement added to the pipeline.

It uses Docker Scout to scan the generated Docker image for **Critical and High severity vulnerabilities**.

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

The tests verify:

* Application default port configuration
* Application environment configuration

Previous successful result:

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

Jenkins builds the Docker image using the project's Dockerfile.

```groovy
stage('Docker Build') {
    steps {
        echo 'Building Docker image...'
        bat 'docker build -t %DOCKER_IMAGE%:%DOCKER_TAG% .'
    }
}
```

The Docker image is tagged using the Jenkins build number.

Previous successful Build #5:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

A security-hardened image was manually built and verified as:

```text
narinder15/jenkins-ci-cd-docker-pipeline:6
```

---

## 6. Security Scan Stage

The DevSecOps improvement adds a Docker Scout security scan after Docker image creation.

```groovy
stage('Security Scan') {
    steps {
        echo 'Scanning Docker image for Critical and High vulnerabilities...'
        bat 'docker scout cves --exit-code --only-severity critical,high %DOCKER_IMAGE%:%DOCKER_TAG%'
    }
}
```

The `--exit-code` option allows the security scan to act as a pipeline security gate.

Critical and High vulnerabilities can therefore prevent the pipeline from continuing to the Docker Push stage.

> The updated Jenkinsfile contains this stage. A new successful Jenkins pipeline execution using this stage has not yet been recorded in this README.

---

## 7. Docker Push Stage

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

Docker Hub credentials are stored securely in Jenkins Credentials.

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

## Current Dockerfile

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

### Docker Security Improvement

The application only requires the Node.js runtime when running in production.

npm and Corepack were present in the original runtime image but were not required by the application at runtime.

They were therefore removed from the production image to reduce the runtime software footprint and attack surface.

The secured image was tested successfully with:

```text
Node.js: v22.23.3
npm: not available
```

The application continued to run successfully.

---

# 🔒 Docker Compose Security Hardening

The project now includes:

```text
compose.yaml
```

Current configuration:

```yaml
services:
  app:
    build:
      context: .
    image: narinder15/jenkins-ci-cd-docker-pipeline:6
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

The configuration was validated successfully using:

```text
docker compose config
```

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

Previous successful result:

```text
2 tests
2 pass
0 fail
```

---

# 🔍 Security Scanning

Security scanning was performed using **Docker Scout**.

## Initial Image Scan

Image:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

Initial scan:

```text
Critical: 0
High:     10
Medium:   8
Low:      1
Total:    19
```

Vulnerabilities were found in 8 vulnerable packages.

The scan was saved as:

```text
security-scan-before.txt
```

---

## Application Dependency Audit

A `package-lock.json` file was generated to enable npm auditing.

The application dependency audit produced:

```text
found 0 vulnerabilities
```

The result was saved as:

```text
npm-audit-report.txt
```

This indicates that the application's npm dependency set did not contain detected vulnerabilities in the audit.

---

# 🛡️ Security Remediation

The vulnerability investigation showed that the detected vulnerabilities were associated with software included in the original container runtime image, rather than application dependencies.

The production Dockerfile was hardened by removing:

```text
npm
Corepack
npm command wrappers
npx command
```

The Node.js runtime was retained.

A new image was built:

```text
narinder15/jenkins-ci-cd-docker-pipeline:6
```

---

# ✅ Security Scan After Remediation

The hardened image was scanned again using Docker Scout.

Image:

```text
narinder15/jenkins-ci-cd-docker-pipeline:6
```

Result:

```text
Critical: 0
High:     0
Medium:   0
Low:      0
```

Docker Scout reported:

```text
No vulnerable package detected
```

The final scan was saved as:

```text
security-scan-after.txt
```

### Before vs After

| Severity            | Before `:5` | After `:6` |
| ------------------- | ----------- | ---------- |
| Critical            | 0           | 0          |
| High                | 10          | 0          |
| Medium              | 8           | 0          |
| Low                 | 1           | 0          |
| Total               | 19          | 0          |
| Vulnerable packages | 8           | 0          |

The scanned package count also decreased from:

```text
212 packages
```

to:

```text
26 packages
```

---

# 🐧 Linux Hardening

Basic Linux security checks were performed in WSL Ubuntu.

## System Updates

The system package list was updated and available upgrades were installed.

The system reported some packages held back because of normal phased updates.

These packages were not force-installed.

---

## Network Service Review

Listening network ports were reviewed using:

```text
sudo ss -tulpn
```

Unknown listeners were identified and investigated.

Ports that could not be confidently associated with an unnecessary service were **not disabled blindly**.

This avoids disrupting legitimate services without sufficient evidence.

---

## Running Services Review

Running services were reviewed using:

```text
systemctl --type=service --state=running --no-pager
```

No service was disabled without confirming that it was unnecessary.

The `unattended-upgrades` service was active.

---

## File Permission Check

World-writable files in the user's home directory were checked.

Result:

```text
No world-writable files found
```

---

## Root Account Check

The root account status was checked using:

```text
sudo passwd -S root
```

The root account was reported as locked.

---

# 🚀 Secure Deployment Verification

The hardened image was deployed using Docker Compose.

Container:

```text
jenkins-cicd-secure-app
```

Image:

```text
narinder15/jenkins-ci-cd-docker-pipeline:6
```

Port mapping:

```text
127.0.0.1:3006 → 3005
```

Container status:

```text
Up
```

The application was then tested using:

```text
curl.exe http://127.0.0.1:3006
```

The application responded successfully with:

```text
Jenkins CI/CD Pipeline

Application deployed successfully through Jenkins and Docker.

Environment: production
```

This confirms that the security hardening did not prevent the application from functioning.

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

Credentials are stored securely in Jenkins Credentials and are not hard-coded into the source code.

---

# 📦 Docker Images

## Previous Successful Jenkins Image

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

This image was successfully built and pushed during Jenkins Build #5.

## Security-Hardened Image

```text
narinder15/jenkins-ci-cd-docker-pipeline:6
```

This image was manually rebuilt after Docker runtime hardening and was successfully:

* Built
* Scanned
* Verified
* Started
* Tested
* Deployed through Docker Compose

Docker Scout reported:

```text
0 Critical
0 High
0 Medium
0 Low
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

# 🔐 DevSecOps Practices Implemented

The project now incorporates security throughout the CI/CD workflow.

### 1. Secure Credentials

Credentials are stored in Jenkins Credentials rather than directly in source code.

### 2. Dependency Auditing

npm auditing is used to check application dependencies.

### 3. Container Vulnerability Scanning

Docker Scout scans Docker images for known vulnerabilities.

### 4. Security Gate

The Jenkins pipeline includes a Docker Scout security stage that checks Critical and High vulnerabilities before Docker Push.

### 5. Container Hardening

The production container:

* Runs as a non-root user
* Uses a read-only filesystem
* Drops Linux capabilities
* Prevents privilege escalation
* Exposes the application only through localhost in the Compose deployment

### 6. Linux Hardening

Basic system patching, service review, network-port review, file-permission checks, and root-account checks were performed.

---

# 📋 CI/CD + DevSecOps Workflow

The updated workflow is:

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
    |          +---- Critical/High found → Pipeline stops
    |          |
    |          +---- No Critical/High → Continue
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

# 🖼️ Evidence Screenshots

The project contains screenshots documenting the implementation.

| Screenshot                         | Evidence                       |
| ---------------------------------- | ------------------------------ |
| `01-prerequisites.png`             | Required tools and environment |
| `02-application-running.png`       | Node.js application            |
| `03-automated-test.png`            | Automated tests                |
| `04-docker-image-local.png`        | Local Docker image             |
| `05-docker-container-running.png`  | Docker container               |
| `06-github-repository.png`         | GitHub repository              |
| `07-jenkins-pipeline-success.png`  | Jenkins pipeline               |
| `08-jenkins-build-success.png`     | Successful Jenkins build       |
| `09-dockerhub-image.png`           | Docker Hub image               |
| `10-secure-compose-deployment.png` | Secure Compose deployment      |
| `11-linux-patching-status.png`     | Linux package updates          |
| `12-file-permission-check.png`     | File permission security check |
| `13-root-account-status.png`       | Root account status            |
| `14-security-scan-before.png`      | Initial Docker Scout scan      |
| `15-secure-deployment-final.png`   | Final secured deployment       |

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

# 🌐 GitHub Repository

GitHub repository:

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
* Security scan evidence
* Project screenshots

---

# 🐳 Docker Hub Repository

Docker Hub repository:

```text
https://hub.docker.com/r/narinder15/jenkins-ci-cd-docker-pipeline
```

Previous successful Jenkins image:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

Security-hardened image:

```text
narinder15/jenkins-ci-cd-docker-pipeline:6
```

---

# 🏁 Conclusion

This project demonstrates an end-to-end Jenkins CI/CD and DevSecOps workflow integrated with GitHub and Docker.

The pipeline performs:

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
```

The project was extended with practical security improvements including:

* npm dependency auditing
* Docker Scout vulnerability scanning
* Docker runtime hardening
* Non-root container execution
* Read-only container filesystem
* Linux capability removal
* No-new-privileges protection
* Localhost-only deployment
* Basic Linux hardening
* Automated Critical/High vulnerability gating in Jenkins

The initial Docker image contained:

```text
19 detected vulnerabilities
```

After removing unnecessary runtime package managers and rebuilding the image, Docker Scout reported:

```text
0 Critical
0 High
0 Medium
0 Low
```

The final security-hardened image was also deployed and tested successfully, confirming that the application continued to operate correctly after the security improvements.

The project provides practical experience with **CI/CD automation, Jenkins Declarative Pipelines, GitHub integration, Docker containerization, Docker Compose, Docker Scout, DevSecOps, secure credentials management, automated testing, vulnerability remediation, Linux hardening, Docker Hub publishing, and deployment strategies**.
