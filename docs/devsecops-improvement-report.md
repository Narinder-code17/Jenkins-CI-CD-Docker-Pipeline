# DevSecOps Improvement Report

## 1. Project

**Project:** Jenkins CI/CD Docker Pipeline

**Application:** Node.js web application

**Tools and Technologies:**

* Jenkins
* GitHub
* Node.js
* Docker
* Docker Compose
* Docker Hub
* Docker Scout
* WSL Ubuntu
* Git

---

## 2. Objective

The objective of this improvement activity was to review the existing CI/CD pipeline and introduce basic DevSecOps practices.

The improvement focused on:

* Reviewing the existing CI/CD workflow.
* Improving YAML configuration.
* Applying basic Linux hardening.
* Performing application and container security scans.
* Identifying vulnerabilities and misconfigurations.
* Applying security remediation.
* Integrating security scanning into the CI/CD pipeline.
* Reviewing DevSecOps practices across the SDLC.
* Using AI-assisted analysis to identify workflow improvements.

---

# 3. Existing CI/CD Workflow

The original pipeline consisted of:

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

The pipeline successfully demonstrated CI/CD automation using Jenkins, GitHub, Docker, and Docker Hub.

The previous successful Jenkins execution was:

```text
Build #5
```

Docker image:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

All previous pipeline stages completed successfully.

---

# 4. Security Gaps Identified

During the review, the following areas were identified for improvement.

## 4.1 No Automated Container Security Gate

The original pipeline built and pushed the Docker image without automatically checking the image for vulnerabilities.

### Improvement

Docker Scout was added to the pipeline as a security scanning stage.

---

## 4.2 Unnecessary Runtime Software

The original Node.js production image contained:

```text
npm
Corepack
```

The application only requires Node.js to execute the server.

### Improvement

npm and Corepack were removed from the production runtime image.

---

## 4.3 Container Privileges

The initial deployment did not include explicit container hardening controls.

### Improvement

Docker Compose was configured to:

* Run as the `node` user.
* Use a read-only filesystem.
* Drop all Linux capabilities.
* Prevent privilege escalation.

---

## 4.4 Network Exposure

The secure Compose deployment initially needed stronger host binding controls.

### Improvement

The application was bound to:

```text
127.0.0.1:3006
```

instead of exposing the application directly on all host interfaces.

---

## 4.5 Dependency Audit

The application did not initially contain a `package-lock.json` file, which prevented `npm audit` from running.

### Improvement

A lockfile was generated using:

```text
npm install --package-lock-only
```

The resulting audit reported:

```text
found 0 vulnerabilities
```

---

# 5. Improved Docker Configuration

The production Dockerfile was modified to remove unnecessary package managers.

The relevant configuration is:

```dockerfile
RUN rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/lib/node_modules/corepack \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /usr/local/bin/corepack
```

The Node.js runtime remains available.

Verification:

```text
Node.js: v22.23.3
```

npm was no longer available in the runtime image.

---

# 6. Docker Compose Hardening

A new:

```text
compose.yaml
```

was introduced.

The important security controls are:

```yaml
user: "node"

read_only: true

security_opt:
  - no-new-privileges:true

cap_drop:
  - ALL
```

### Security Benefits

| Control              | Improvement                                          |
| -------------------- | ---------------------------------------------------- |
| Non-root user        | Reduces privileges available to the application      |
| Read-only filesystem | Reduces unauthorized modification of container files |
| Capability dropping  | Removes unnecessary Linux capabilities               |
| No-new-privileges    | Helps prevent privilege escalation                   |
| Localhost binding    | Reduces network exposure                             |

---

# 7. Docker Scout Security Scan

Docker Scout was used to scan the Docker images.

## Before Remediation

Image:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

Results:

| Severity  | Count  |
| --------- | ------ |
| Critical  | 0      |
| High      | 10     |
| Medium    | 8      |
| Low       | 1      |
| **Total** | **19** |

The initial scan identified 8 vulnerable packages.

---

# 8. Application Dependency Scan

After generating the package lockfile, npm audit was executed.

Result:

```text
found 0 vulnerabilities
```

This indicates that the application's npm dependency set did not contain detected vulnerabilities during the audit.

Evidence:

```text
npm-audit-report.txt
```

---

# 9. Vulnerability Remediation

The vulnerability investigation showed that the detected container vulnerabilities were associated with software included in the original runtime image rather than the application's dependency set.

The application does not require npm or Corepack to run.

Therefore, these components were removed from the production image.

A new image was created:

```text
narinder15/jenkins-ci-cd-docker-pipeline:6
```

---

# 10. Security Scan After Remediation

Docker Scout was executed again against the hardened image.

Image:

```text
narinder15/jenkins-ci-cd-docker-pipeline:6
```

Results:

| Severity  | Before | After |
| --------- | ------ | ----- |
| Critical  | 0      | 0     |
| High      | 10     | 0     |
| Medium    | 8      | 0     |
| Low       | 1      | 0     |
| **Total** | **19** | **0** |

Docker Scout reported:

```text
No vulnerable package detected
```

The final image contained:

```text
26 indexed packages
0 vulnerable packages
```

---

# 11. Linux Hardening

Basic Linux security checks were performed in WSL Ubuntu.

## System Updates

The system package list was updated and available upgrades were installed.

Commands used:

```text
sudo apt update
sudo apt upgrade -y
```

Some packages remained pending because of normal phased updates.

---

## Network Port Review

Listening ports were reviewed using:

```text
sudo ss -tulpn
```

Unknown listeners were investigated.

Services were not disabled without confirming their purpose.

This avoids unintentionally disrupting legitimate services.

---

## Running Service Review

Running services were reviewed using:

```text
systemctl --type=service --state=running --no-pager
```

No service was disabled without sufficient evidence that it was unnecessary.

---

## File Permission Review

World-writable files in the user's home directory were checked.

Result:

```text
No world-writable files found
```

---

## Root Account Review

The root account status was checked using:

```text
sudo passwd -S root
```

The root account was reported as locked.

---

# 12. Jenkins DevSecOps Improvement

The Jenkinsfile was modified to introduce a security scanning stage.

The updated pipeline flow is:

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

The new security stage is:

```groovy
stage('Security Scan') {
    steps {
        echo 'Scanning Docker image for Critical and High vulnerabilities...'
        bat 'docker scout cves --exit-code --only-severity critical,high %DOCKER_IMAGE%:%DOCKER_TAG%'
    }
}
```

---

# 13. Security Gate

The security stage uses:

```text
--exit-code
```

and:

```text
--only-severity critical,high
```

This allows Docker Scout to act as a security gate.

The intended workflow is:

```text
Docker Build
     |
     v
Security Scan
     |
     +---- Critical/High vulnerabilities
     |             |
     |             v
     |        Pipeline fails
     |
     +---- No Critical/High
                   |
                   v
              Docker Push
```

This moves security validation earlier into the CI/CD process.

---

# 14. SDLC and DevSecOps Practices

DevSecOps integrates security into the software development lifecycle rather than treating security as a final activity.

The following practices are now represented in the project.

| SDLC Area              | DevSecOps Practice                     |
| ---------------------- | -------------------------------------- |
| Planning               | Identify security requirements         |
| Development            | Secure coding and dependency awareness |
| Build                  | Automated application build            |
| Testing                | Automated application testing          |
| Security Testing       | npm audit and Docker Scout             |
| Containerization       | Docker image hardening                 |
| Deployment             | Secure Docker Compose configuration    |
| Operations             | Linux hardening and service review     |
| Monitoring/Improvement | Security scan results and remediation  |

---

# 15. Security Shift

The original workflow primarily focused on:

```text
Build → Test → Package → Deploy
```

The improved workflow introduces security throughout the process:

```text
Build
  ↓
Test
  ↓
Package
  ↓
Container Build
  ↓
Security Scan
  ↓
Security Gate
  ↓
Deploy
```

This demonstrates the basic DevSecOps principle of integrating security into CI/CD.

---

# 16. AI-Assisted Workflow Improvements

AI-assisted analysis was used to identify practical improvements for the development and DevOps workflow.

Suggested improvements include:

### Automated Security Review

Use AI to review:

* Dockerfiles
* Jenkinsfiles
* YAML configurations
* CI/CD logs
* security scan reports

### Faster Troubleshooting

AI can help analyze:

* Jenkins build failures
* Docker build errors
* container startup failures
* dependency problems
* configuration issues

### Documentation Generation

AI can assist in generating:

* deployment documentation
* security reports
* DevSecOps reports
* incident summaries
* interview preparation material

### CI/CD Optimization

AI-assisted analysis can help identify:

* unnecessary pipeline stages
* duplicated commands
* inefficient builds
* opportunities for caching
* missing automated tests
* missing security gates

AI suggestions should still be reviewed and tested before being applied to production systems.

---

# 17. Recommended Future Improvements

The following improvements can be considered for future versions of the project.

## 17.1 Automated Dependency Updates

Use automated dependency update tools to identify newer secure versions.

## 17.2 Secret Scanning

Add tools such as secret scanners to prevent accidental credential commits.

## 17.3 Static Application Security Testing

Introduce SAST tools to analyze source code for security issues.

## 17.4 Container Image Signing

Implement image signing and verification for stronger supply-chain security.

## 17.5 SBOM Generation

Generate and archive a Software Bill of Materials for every release.

## 17.6 Vulnerability Thresholds

Extend the Jenkins security gate to enforce organization-specific vulnerability policies.

## 17.7 Branch Protection

Require successful CI/CD and security checks before merging changes.

## 17.8 Continuous Monitoring

Monitor deployed applications and infrastructure for security changes.

---

# 18. Evidence

Security evidence generated during the implementation includes:

```text
npm-audit-report.txt
security-scan-before.txt
security-scan-after.txt
```

Screenshots include:

```text
screenshots/10-secure-compose-deployment.png
screenshots/11-linux-patching-status.png
screenshots/12-file-permission-check.png
screenshots/13-root-account-status.png
screenshots/14-security-scan-before.png
screenshots/15-secure-deployment-final.png
```

---

# 19. Results

The DevSecOps improvements produced the following results:

```text
Application Dependency Vulnerabilities
              ↓
             0
```

```text
Docker Image Vulnerabilities
              ↓
Before: 19
After:   0
```

The secured application was successfully deployed using Docker Compose.

The application responded successfully in the production environment.

---

# 20. Conclusion

The Jenkins CI/CD project was improved by integrating basic DevSecOps practices into the existing workflow.

The major improvements were:

* Application dependency auditing
* Docker vulnerability scanning
* Docker runtime hardening
* Non-root container execution
* Read-only container filesystem
* Linux capability removal
* No-new-privileges protection
* Localhost-only application binding
* Linux hardening checks
* Automated Jenkins security scanning
* Critical/High vulnerability security gating
* AI-assisted workflow improvement analysis

The initial Docker image contained 19 detected vulnerabilities.

After remediation, the hardened image contained:

```text
0 Critical
0 High
0 Medium
0 Low
```

The final secured image was successfully deployed and the application remained functional.

This demonstrates how security can be integrated into the CI/CD workflow as a continuous DevSecOps practice rather than being performed only after deployment.
