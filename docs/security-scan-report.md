# Security Scan Report

## 1. Project

**Project:** Jenkins CI/CD Docker Pipeline

**Application:** Node.js web application

**Security Tools:**

* npm audit
* Docker Scout
* Linux system security checks

---

## 2. Objective

The objective of the security assessment was to:

* Identify vulnerabilities in application dependencies.
* Scan the Docker container image for known vulnerabilities.
* Identify security-related misconfigurations.
* Apply basic Linux hardening.
* Apply Docker container security hardening.
* Verify that the application continues to work after remediation.

---

## 3. Application Dependency Audit

A `package-lock.json` file was generated to enable npm dependency auditing.

The following command was used:

```text
npm audit
```

Result:

```text
found 0 vulnerabilities
```

### Finding

No known vulnerabilities were detected in the application's npm dependency set.

Evidence file:

```text
npm-audit-report.txt
```

---

## 4. Initial Docker Image Scan

The original Docker image was:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

Docker Scout was used to identify known vulnerabilities.

Command:

```text
docker scout cves narinder15/jenkins-ci-cd-docker-pipeline:5
```

### Initial Results

| Severity  | Vulnerabilities |
| --------- | --------------- |
| Critical  | 0               |
| High      | 10              |
| Medium    | 8               |
| Low       | 1               |
| **Total** | **19**          |

Docker Scout identified vulnerabilities in 8 vulnerable packages.

The vulnerabilities were associated with software present in the original container runtime image.

Evidence file:

```text
security-scan-before.txt
```

Evidence screenshot:

```text
screenshots/14-security-scan-before.png
```

---

## 5. Docker Scout Recommendation Analysis

Docker Scout recommendations were checked for the base image.

Current base image:

```text
node:22-alpine
```

Docker Scout reported that the current Node.js 22 Alpine base image was up to date.

Major runtime alternatives such as Node.js 24 and Node.js 26 were available, but changing the major runtime version was not performed because major runtime upgrades may introduce compatibility or breaking changes.

Therefore, the remediation focused on removing unnecessary software from the production runtime image.

---

## 6. Vulnerability Analysis

The application dependency audit reported:

```text
0 vulnerabilities
```

However, the Docker image scan identified vulnerabilities.

The investigation showed that the vulnerable packages were associated with the Node.js/npm toolchain present in the original runtime image rather than application dependencies.

The production application only requires the Node.js runtime to execute:

```text
node app/server.js
```

npm and Corepack are not required during normal application runtime.

---

## 7. Security Remediation

The Dockerfile was hardened by removing unnecessary package managers from the production image.

The following components were removed:

```text
npm
Corepack
npm command wrapper
npx command
corepack command
```

The Node.js runtime was retained.

The updated Dockerfile includes:

```dockerfile
RUN rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/lib/node_modules/corepack \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /usr/local/bin/corepack
```

A new image was built:

```text
narinder15/jenkins-ci-cd-docker-pipeline:6
```

---

## 8. Runtime Verification

The secured image was tested to verify that Node.js remained available.

Node.js version:

```text
v22.23.3
```

npm was intentionally removed from the production image.

Verification produced:

```text
sh: npm: not found
```

This confirmed that npm was no longer available in the runtime image.

The application itself was then started successfully.

---

## 9. Final Docker Scout Scan

The hardened image was scanned again.

Command:

```text
docker scout cves narinder15/jenkins-ci-cd-docker-pipeline:6
```

### Final Results

| Severity  | Before `:5` | After `:6` |
| --------- | ----------- | ---------- |
| Critical  | 0           | 0          |
| High      | 10          | 0          |
| Medium    | 8           | 0          |
| Low       | 1           | 0          |
| **Total** | **19**      | **0**      |

Docker Scout reported:

```text
No vulnerable package detected
```

The final scan contained:

```text
26 packages
0 vulnerable packages
```

Evidence file:

```text
security-scan-after.txt
```

---

## 10. Docker Container Hardening

The project also introduced Docker Compose security controls.

The secure Compose configuration includes:

```yaml
user: "node"

read_only: true

security_opt:
  - no-new-privileges:true

cap_drop:
  - ALL
```

### Security Controls

| Control                  | Purpose                                     |
| ------------------------ | ------------------------------------------- |
| `user: node`             | Runs the application as a non-root user     |
| `read_only: true`        | Prevents writes to the container filesystem |
| `cap_drop: ALL`          | Removes unnecessary Linux capabilities      |
| `no-new-privileges:true` | Prevents privilege escalation               |
| `127.0.0.1` binding      | Restricts host access to localhost          |

---

## 11. Linux Hardening

Basic Linux hardening checks were performed using WSL Ubuntu.

### System Updates

System packages were updated using:

```text
sudo apt update
sudo apt upgrade -y
```

Some packages remained pending because of normal phased updates.

### Network Port Review

Listening ports were reviewed using:

```text
sudo ss -tulpn
```

Unknown listeners were investigated.

Services were not disabled without confirming that they were unnecessary.

### Service Review

Running services were reviewed using:

```text
systemctl --type=service --state=running --no-pager
```

### File Permission Check

World-writable files in the user's home directory were checked.

Result:

```text
No world-writable files found
```

### Root Account Check

The root account was checked using:

```text
sudo passwd -S root
```

The root account was reported as locked.

---

## 12. Secure Compose Deployment

The secured image was deployed using Docker Compose.

Image:

```text
narinder15/jenkins-ci-cd-docker-pipeline:6
```

Container:

```text
jenkins-cicd-secure-app
```

Port:

```text
127.0.0.1:3006 -> 3005
```

Container status:

```text
Up
```

The configuration was validated using:

```text
docker compose config
```

---

## 13. Application Verification

The application was tested after security remediation using:

```text
curl.exe http://127.0.0.1:3006
```

The application responded successfully with:

```text
Jenkins CI/CD Pipeline
Application deployed successfully through Jenkins and Docker.
Environment: production
```

This confirmed that the security changes did not break application functionality.

---

## 14. DevSecOps Pipeline Improvement

A new security stage was added to the Jenkins Declarative Pipeline.

Pipeline flow:

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

The new stage uses:

```groovy
stage('Security Scan') {
    steps {
        echo 'Scanning Docker image for Critical and High vulnerabilities...'
        bat 'docker scout cves --exit-code --only-severity critical,high %DOCKER_IMAGE%:%DOCKER_TAG%'
    }
}
```

The `--exit-code` option allows Docker Scout to act as a security gate.

If Critical or High vulnerabilities are detected, the security scan can return a non-zero exit code and prevent the pipeline from continuing to the Docker Push stage.

---

## 15. Security Findings and Solutions

| Issue                        | Finding                                      | Solution                            |
| ---------------------------- | -------------------------------------------- | ----------------------------------- |
| Application dependencies     | 0 vulnerabilities                            | Continue dependency auditing        |
| Original Docker image        | 19 vulnerabilities                           | Remove unnecessary runtime packages |
| npm in production image      | Not required at runtime                      | Remove npm                          |
| Corepack in production image | Not required at runtime                      | Remove Corepack                     |
| Container privileges         | Additional hardening possible                | Run as `node` user                  |
| Container filesystem         | Writable by default                          | Enable read-only filesystem         |
| Linux capabilities           | Default capabilities                         | Drop all capabilities               |
| Privilege escalation         | Additional protection needed                 | Enable `no-new-privileges`          |
| Host exposure                | Application port could be externally exposed | Bind to `127.0.0.1`                 |
| CI/CD security               | Manual scan could be missed                  | Add Docker Scout security stage     |

---

## 16. Security Result

The security remediation produced the following result:

```text
Before:
19 vulnerabilities

After:
0 vulnerabilities
```

The application dependency audit also reported:

```text
0 vulnerabilities
```

The secured container continued to run successfully after remediation.

---

## 17. Evidence

Security evidence files:

```text
npm-audit-report.txt
security-scan-before.txt
security-scan-after.txt
```

Security screenshots:

```text
screenshots/10-secure-compose-deployment.png
screenshots/11-linux-patching-status.png
screenshots/12-file-permission-check.png
screenshots/13-root-account-status.png
screenshots/14-security-scan-before.png
screenshots/15-secure-deployment-final.png
```

---

## 18. Conclusion

The Jenkins CI/CD project was extended with practical DevSecOps and security controls.

The initial Docker image contained 19 detected vulnerabilities. Application dependency auditing showed no vulnerabilities, so the remediation focused on unnecessary runtime software in the container image.

npm and Corepack were removed from the production image because they were not required to run the application.

After rebuilding the image, Docker Scout reported:

```text
0 Critical
0 High
0 Medium
0 Low
```

Additional security improvements were implemented through Docker Compose hardening, Linux security checks, and an automated Docker Scout security gate in the Jenkins pipeline.

The final secured container was successfully deployed and the application was verified to be functioning correctly.
