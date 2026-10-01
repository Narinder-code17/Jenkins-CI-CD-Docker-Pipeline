# SDLC and DevSecOps Practices Review

## 1. Project

**Project:** Jenkins CI/CD Docker Pipeline

**Purpose:** Review the existing Software Development Life Cycle (SDLC) and identify where DevOps and DevSecOps practices can be applied.

---

# 2. SDLC Overview

The Software Development Life Cycle consists of multiple stages used to develop, test, deploy, and maintain software.

For this project, the SDLC can be represented as:

```text
Planning
   ↓
Development
   ↓
Build
   ↓
Testing
   ↓
Security Testing
   ↓
Deployment
   ↓
Operations
   ↓
Continuous Improvement
```

---

# 3. SDLC and DevOps Mapping

| SDLC Stage       | Project Practice                             | DevOps/DevSecOps Practice  |
| ---------------- | -------------------------------------------- | -------------------------- |
| Planning         | Define application and pipeline requirements | Security requirements      |
| Development      | Node.js application development              | Git version control        |
| Build            | Jenkins automated build                      | CI automation              |
| Testing          | Node.js automated tests                      | Continuous Testing         |
| Security Testing | npm audit and Docker Scout                   | DevSecOps                  |
| Containerization | Docker image creation                        | Infrastructure consistency |
| Deployment       | Docker Compose                               | Automated deployment       |
| Operations       | Linux and container checks                   | Operational security       |
| Improvement      | Scan results and remediation                 | Continuous improvement     |

---

# 4. Planning Stage

During planning, the application and CI/CD requirements are identified.

Important requirements include:

* Node.js application
* GitHub repository
* Jenkins pipeline
* Docker containerization
* Docker Hub image publishing
* Automated testing
* Security scanning
* Secure container deployment

### DevSecOps Practice

Security requirements should be considered during planning rather than being added only after deployment.

Examples:

* Define acceptable vulnerability levels.
* Identify sensitive credentials.
* Define container security requirements.
* Define dependency security requirements.

---

# 5. Development Stage

The application source code is maintained in Git and hosted on GitHub.

Project structure includes:

```text
app/
tests/
Dockerfile
Jenkinsfile
compose.yaml
```

### DevOps Practices

* Git version control
* GitHub repository
* Source code collaboration
* Jenkins integration

### DevSecOps Practices

Developers should consider:

* Secure coding
* Dependency security
* Avoiding hard-coded credentials
* Input validation
* Secure configuration

---

# 6. Build Stage

Jenkins automatically builds the project.

The pipeline uses:

```text
Build
```

to install the project dependencies.

Example:

```groovy
bat 'npm install'
```

### DevOps Practice

Automated builds reduce manual build steps and provide repeatable CI execution.

### DevSecOps Improvement

The build process can be extended with:

* Dependency auditing
* Static analysis
* Secret scanning
* Software composition analysis

---

# 7. Testing Stage

The project uses Node.js's built-in test runner.

The Jenkins pipeline executes:

```text
npm test
```

The existing tests verify:

* Default application port
* Application environment configuration

Previous successful result:

```text
2 tests
2 pass
0 fail
```

### DevOps Practice

Automated testing allows defects to be identified before deployment.

### DevSecOps Practice

Security tests should also become part of automated testing.

Examples:

* Dependency vulnerability scanning
* Static security analysis
* Secret detection
* Container scanning

---

# 8. Security Testing Stage

Security testing was added as part of the weekly DevSecOps improvement.

Two security checks were performed.

## 8.1 npm Audit

A `package-lock.json` file was generated.

The application dependency audit reported:

```text
found 0 vulnerabilities
```

This provides dependency-level security validation.

---

## 8.2 Docker Scout

Docker Scout was used to scan the Docker image.

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

After remediation:

```text
narinder15/jenkins-ci-cd-docker-pipeline:6
```

Final result:

```text
Critical: 0
High:     0
Medium:   0
Low:      0
Total:    0
```

---

# 9. Containerization Stage

Docker is used to package the application into a portable container.

The project uses:

```text
node:22-alpine
```

as the base image.

The production image was hardened by removing unnecessary runtime software.

Removed:

```text
npm
Corepack
npm wrappers
npx
```

Node.js remains available for running the application.

---

# 10. Deployment Stage

Docker Compose is used for secure deployment.

The deployment configuration includes:

```yaml
user: "node"

read_only: true

security_opt:
  - no-new-privileges:true

cap_drop:
  - ALL
```

The application is bound to:

```text
127.0.0.1:3006
```

### DevSecOps Benefits

These controls reduce:

* Container privileges
* Filesystem modification
* Privilege escalation opportunities
* Unnecessary Linux capabilities
* Network exposure

---

# 11. Operations Stage

Basic Linux hardening checks were performed in WSL Ubuntu.

Checks included:

### System Updates

```text
sudo apt update
sudo apt upgrade -y
```

### Listening Ports

```text
sudo ss -tulpn
```

### Running Services

```text
systemctl --type=service --state=running --no-pager
```

### File Permissions

World-writable files in the user's home directory were checked.

Result:

```text
No world-writable files found
```

### Root Account

The root account status was checked.

Result:

```text
Root account locked
```

---

# 12. Jenkins DevSecOps Integration

The Jenkins pipeline was improved by adding a security scanning stage.

Updated workflow:

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

Security stage:

```groovy
stage('Security Scan') {
    steps {
        echo 'Scanning Docker image for Critical and High vulnerabilities...'
        bat 'docker scout cves --exit-code --only-severity critical,high %DOCKER_IMAGE%:%DOCKER_TAG%'
    }
}
```

This allows security validation to happen before Docker image publishing.

---

# 13. Security Gate

The Docker Scout stage uses:

```text
--exit-code
```

and:

```text
--only-severity critical,high
```

The intended behavior is:

```text
Docker Build
     ↓
Security Scan
     ↓
Critical/High vulnerabilities?
     |
     +---- YES → Pipeline stops
     |
     +---- NO → Docker Push
```

This introduces a basic automated security gate into the CI/CD pipeline.

---

# 14. Credentials Security

Jenkins credentials are stored using the Jenkins Credentials system.

The project uses:

```text
github-jenkins-credential
```

for GitHub authentication.

Docker Hub authentication uses:

```text
dockerhub-credentials
```

The credentials are injected using:

```groovy
withCredentials(...)
```

Sensitive credentials are therefore not written directly into the Jenkinsfile.

---

# 15. Continuous Integration Practices

The project demonstrates the following CI practices:

* Source code checkout
* Automated builds
* Automated testing
* Automated packaging
* Docker image creation
* Security scanning

The pipeline reduces the need for manual execution of repetitive development tasks.

---

# 16. Continuous Delivery / Deployment Practices

The project uses Docker images as deployment artifacts.

Each Jenkins build can produce a versioned image using the Jenkins build number.

Example:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

The secured image was manually rebuilt and verified as:

```text
narinder15/jenkins-ci-cd-docker-pipeline:6
```

Docker Compose was then used to deploy the secured image.

---

# 17. DevSecOps Practices Implemented

The following DevSecOps practices are currently demonstrated:

### 1. Dependency Security

```text
npm audit
```

Result:

```text
0 vulnerabilities
```

### 2. Container Security

```text
docker scout cves
```

Result after remediation:

```text
0 vulnerabilities
```

### 3. Container Hardening

* Non-root user
* Read-only filesystem
* Capability dropping
* No-new-privileges

### 4. Linux Hardening

* System updates
* Service review
* Port review
* File permission review
* Root account review

### 5. CI/CD Security Gate

Docker Scout was added to Jenkins before Docker Push.

---

# 18. Recommended DevSecOps Improvements

The project can be further improved by adding:

## Static Application Security Testing

Use SAST tools to scan source code for security issues.

## Secret Scanning

Automatically detect accidentally committed:

* Passwords
* API keys
* Tokens
* Private keys

## Software Composition Analysis

Continuously scan third-party dependencies.

## Container Image Signing

Sign Docker images before publishing them.

## SBOM Generation

Generate a Software Bill of Materials for every release.

## Automated Dependency Updates

Use automated dependency update mechanisms to keep packages secure.

## Branch Protection

Require successful CI and security checks before merging code.

## Continuous Monitoring

Monitor deployed applications and infrastructure for security changes.

---

# 19. AI-Assisted DevSecOps Improvements

AI can assist the DevOps workflow by analyzing:

* Jenkins pipeline failures
* Docker build errors
* Security scan results
* Configuration files
* YAML files
* Dockerfiles
* Jenkinsfiles
* Deployment logs

AI can also help generate:

* Documentation
* Security reports
* Troubleshooting suggestions
* Pipeline optimization ideas
* Test cases

AI recommendations should be reviewed and validated before being applied to production systems.

---

# 20. SDLC Security Model

The improved SDLC can be represented as:

```text
             PLAN
              |
              v
        Security Requirements
              |
              v
          DEVELOP
              |
              v
        Secure Coding
              |
              v
           BUILD
              |
              v
        Dependency Audit
              |
              v
           TEST
              |
              v
        Security Testing
              |
              v
        CONTAINERIZE
              |
              v
       Container Scanning
              |
              v
          DEPLOY
              |
              v
       Secure Configuration
              |
              v
          OPERATE
              |
              v
       Monitor & Improve
              |
              +----------------+
                               |
                               v
                              PLAN
```

Security is therefore treated as a continuous activity throughout the SDLC.

---

# 21. Results

The DevSecOps improvements produced measurable results.

### Application Dependency Scan

```text
0 vulnerabilities
```

### Docker Image Scan

```text
Before: 19 vulnerabilities
After:   0 vulnerabilities
```

### Container Security

```text
Non-root user       ✓
Read-only FS        ✓
Capabilities dropped ✓
No-new-privileges   ✓
Localhost binding   ✓
```

### Linux Security

```text
System updates reviewed       ✓
Network ports reviewed        ✓
Services reviewed             ✓
File permissions reviewed     ✓
Root account reviewed         ✓
```

---

# 22. Conclusion

The project demonstrates how DevOps and DevSecOps practices can be integrated into an existing CI/CD pipeline.

The original pipeline focused mainly on:

```text
Build → Test → Package → Docker → Push
```

The improved pipeline adds security:

```text
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
Security Gate
  ↓
Docker Push
```

Security was also incorporated into the container and deployment configuration through Docker hardening and secure Docker Compose settings.

The initial Docker image contained 19 detected vulnerabilities. After remediation, Docker Scout reported zero detected vulnerabilities.

This demonstrates the core DevSecOps principle of integrating security into the software delivery lifecycle rather than treating security as a separate final-stage activity.
