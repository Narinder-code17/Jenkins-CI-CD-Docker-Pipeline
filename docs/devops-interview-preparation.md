# DevOps Interview Preparation

## 1. Project Introduction

### Q1. Tell me about your Jenkins CI/CD Docker project.

I developed a Node.js application and created a complete CI/CD pipeline using Jenkins and Docker. The pipeline automatically checks out the code from GitHub, installs dependencies, runs automated tests, packages the application, builds a Docker image, performs a security scan, and pushes the image to Docker Hub. I also improved the project using DevSecOps practices such as Docker Scout scanning, container hardening, Linux security checks, and secure Docker Compose deployment.

---

### Q2. What was the main purpose of the project?

The main purpose was to automate the software delivery process. Instead of manually building, testing, and packaging the application, Jenkins performs these steps automatically. I also added security checks so that vulnerabilities can be detected before the Docker image is published.

---

### Q3. What technologies did you use?

I used:

* Jenkins for CI/CD
* Git and GitHub for version control
* Node.js for the application
* Docker for containerization
* Docker Compose for deployment
* Docker Hub for image storage
* Docker Scout for container vulnerability scanning
* Linux/Ubuntu for security and administration
* PowerShell and WSL for development and testing

---

# 2. CI/CD Questions

## Q4. What is CI/CD?

CI stands for Continuous Integration. It means automatically building and testing code whenever changes are integrated.

CD stands for Continuous Delivery or Continuous Deployment. It automates the process of preparing or deploying the application after successful CI checks.

In my project, Jenkins automates the build, test, Docker image creation, security scanning, and image publishing process.

---

## Q5. Why did you use Jenkins?

I used Jenkins because it is a widely used automation server that can integrate with GitHub, execute automated builds and tests, build Docker images, and run security checks through pipeline stages.

---

## Q6. What is a Jenkinsfile?

A Jenkinsfile is a text file that defines the Jenkins pipeline as code.

In my project, the Jenkinsfile defines stages such as:

```text
Checkout
Build
Test
Package
Docker Build
Security Scan
Docker Push
```

---

## Q7. What is a Jenkins Pipeline?

A Jenkins Pipeline is an automated workflow that defines the steps required to build, test, secure, and deliver an application.

My pipeline is written using Declarative Pipeline syntax.

---

## Q8. What are the stages in your pipeline?

The main stages are:

1. Checkout
2. Build
3. Test
4. Package
5. Docker Build
6. Security Scan
7. Docker Push

Each stage performs a specific part of the software delivery process.

---

## Q9. What happens during the Checkout stage?

The Checkout stage retrieves the source code from the GitHub repository so Jenkins can work with the latest project files.

---

## Q10. What happens during the Build stage?

The Build stage installs the Node.js project dependencies using:

```text
npm install
```

---

## Q11. What happens during the Test stage?

The Test stage runs the automated tests using:

```text
npm test
```

My application currently has two automated tests, and both passed successfully.

---

## Q12. What happens during the Package stage?

The Package stage creates an npm package using:

```text
npm pack
```

This verifies that the application can be packaged as a distributable artifact.

---

# 3. Docker Questions

## Q13. What is Docker?

Docker is a containerization platform that packages an application and its dependencies into a container so it can run consistently across environments.

---

## Q14. Why did you use Docker?

I used Docker to package the Node.js application into a portable and reproducible environment.

It also makes deployment easier because the same image can be used across different environments.

---

## Q15. What is a Docker image?

A Docker image is a packaged, read-only template containing the application, runtime, dependencies, and configuration required to create a container.

---

## Q16. What is a Docker container?

A container is a running instance of a Docker image.

In my project, the Node.js application runs inside a Docker container.

---

## Q17. What is a Dockerfile?

A Dockerfile contains instructions used to build a Docker image.

My Dockerfile:

* Uses Node.js Alpine
* Creates the application working directory
* Copies application files
* Sets environment variables
* Exposes port 3005
* Runs the Node.js application

---

## Q18. Why did you use `node:22-alpine`?

I used `node:22-alpine` because Alpine provides a lightweight Linux base image while providing the Node.js runtime required by the application.

---

# 4. Docker Security Questions

## Q19. How did you improve Docker security?

I applied several security improvements:

* Run the application as the `node` user instead of root.
* Use a read-only filesystem.
* Drop all Linux capabilities.
* Enable `no-new-privileges`.
* Remove unnecessary npm/Corepack components from the runtime image.
* Scan the image using Docker Scout.
* Bind the application port to localhost in Docker Compose.

---

## Q20. Why should containers avoid running as root?

Running as root can increase the impact of a container compromise.

Using a non-root user follows the principle of least privilege and reduces unnecessary privileges.

---

## Q21. What does `read_only: true` do?

It makes the container's filesystem read-only.

This reduces the ability of an application or attacker to modify files inside the container.

---

## Q22. What does `cap_drop: ALL` mean?

Linux capabilities provide additional privileges to processes.

Dropping all capabilities removes unnecessary privileges from the container.

---

## Q23. What does `no-new-privileges` do?

It prevents processes inside the container from gaining additional privileges.

This helps reduce privilege escalation risks.

---

# 5. DevSecOps Questions

## Q24. What is DevSecOps?

DevSecOps means integrating security into the DevOps lifecycle.

Instead of performing security checks only after development, security is considered during development, testing, building, and deployment.

---

## Q25. How did you implement DevSecOps?

I implemented DevSecOps by:

* Running `npm audit`
* Scanning Docker images using Docker Scout
* Adding a Security Scan stage to Jenkins
* Applying container hardening
* Performing Linux security checks
* Using secure Jenkins credentials
* Documenting security findings and remediation

---

## Q26. What was the result of your security scan?

Initially, Docker Scout detected:

```text
Critical: 0
High:     10
Medium:   8
Low:      1
Total:    19
```

After remediation, the new image reported:

```text
Critical: 0
High:     0
Medium:   0
Low:      0
Total:    0
```

---

## Q27. How did you reduce the vulnerabilities?

The vulnerabilities were mainly related to unnecessary packages from the Node.js/npm toolchain.

I inspected the runtime image and found that npm and Corepack were not required to run the production application.

I removed unnecessary runtime components from the Docker image and rebuilt it.

The final Docker Scout scan reported zero detected vulnerabilities.

---

## Q28. What is `npm audit`?

`npm audit` checks Node.js project dependencies for known security vulnerabilities.

In my project, after creating the package lock file, the audit reported:

```text
found 0 vulnerabilities
```

---

## Q29. Why did `npm audit` initially fail?

Initially there was no `package-lock.json` file.

The audit required a dependency lockfile, so I generated it using:

```text
npm install --package-lock-only
```

After that, `npm audit` completed successfully.

---

# 6. Docker Compose Questions

## Q30. Why did you use Docker Compose?

Docker Compose allows application configuration and deployment settings to be defined in a YAML file.

It makes the deployment configuration repeatable and easier to manage.

---

## Q31. What security settings did you add to Compose?

I added:

```yaml
user: "node"

read_only: true

security_opt:
  - no-new-privileges:true

cap_drop:
  - ALL
```

I also bound the application to:

```text
127.0.0.1:3006
```

instead of exposing it on every network interface.

---

# 7. Linux Questions

## Q32. What Linux security checks did you perform?

I performed:

* System update checks
* Listening port checks
* Running service checks
* File permission checks
* Root account status checks

---

## Q33. How did you check listening ports?

I used:

```text
sudo ss -tulpn
```

This displays listening network sockets and related information.

---

## Q34. How did you check running services?

I used:

```text
systemctl --type=service --state=running --no-pager
```

This helped review currently running services.

---

## Q35. How did you check for world-writable files?

I used:

```text
find "$HOME" -type f -perm -0002 -print
```

No world-writable files were found in the user's home directory.

---

## Q36. How did you check the root account?

I used:

```text
sudo passwd -S root
```

The root account was shown as locked.

---

# 8. Git and GitHub Questions

## Q37. Why do you use Git?

Git is a distributed version control system used to track source code changes and collaborate on software projects.

---

## Q38. Why did you use GitHub?

I used GitHub to host the source code and integrate the repository with Jenkins.

---

## Q39. How does Jenkins get code from GitHub?

Jenkins uses the Git repository configuration and checkout step to retrieve the project source code.

---

# 9. Jenkins Credentials

## Q40. How did you secure Docker Hub credentials?

I stored the credentials in Jenkins Credentials rather than hard-coding the username and password in the Jenkinsfile.

The pipeline uses:

```groovy
withCredentials(...)
```

to access them during the Docker Push stage.

---

## Q41. Why should credentials not be hard-coded?

Hard-coded credentials can accidentally be exposed through source code repositories or logs.

Using a credential management system keeps sensitive information separate from the application source code.

---

# 10. Kubernetes Questions

## Q42. What is Kubernetes?

Kubernetes is a container orchestration platform used to deploy, manage, scale, and maintain containerized applications.

---

## Q43. What is Minikube?

Minikube is a tool that runs a local Kubernetes cluster, mainly for learning, development, and testing.

I have used Minikube for local Kubernetes practice.

---

## Q44. Docker vs Kubernetes?

Docker is mainly used for building and running containers.

Kubernetes is used to orchestrate and manage containers across a cluster.

---

# 11. AWS Questions

## Q45. Which AWS services have you worked with?

I have worked with or studied:

* Amazon S3
* CloudFront
* CloudWatch
* SQS
* SNS
* SES

I have also explored AWS S3 as part of my genomic data project.

---

## Q46. What is Amazon S3?

Amazon S3 is an object storage service used to store and retrieve files and other objects.

---

# 12. Scenario-Based Questions

## Q47. What would you do if a Jenkins build fails?

First, I would check the Jenkins console output and identify the failed stage.

Then I would reproduce the issue locally if necessary, check the relevant configuration or code, fix the problem, and run the pipeline again.

---

## Q48. What would you do if Docker Scout reports a High vulnerability?

I would first identify the affected package and determine whether it comes from the application dependency or the base image.

Then I would check for an available secure version or remove unnecessary components if they are not required at runtime.

After making the change, I would rebuild and rescan the image.

---

## Q49. What would you do if tests pass but the Docker container does not start?

I would check:

1. Docker build logs
2. Container logs
3. Dockerfile
4. Environment variables
5. Port configuration
6. Application startup command

For example:

```text
docker logs <container-name>
```

can help identify runtime errors.

---

## Q50. What would you do if a port is already in use?

I would identify the process using the port and either stop the unnecessary process or configure the application/container to use another available port.

I would not blindly terminate an unknown service without checking its purpose.

---

# 13. Project-Based Technical Questions

## Q51. Why did you choose Jenkins instead of manually running Docker commands?

Jenkins provides automation and repeatability.

Instead of manually executing every step, Jenkins can automatically run the defined pipeline whenever the project is built.

---

## Q52. Why did you add a security scan before Docker Push?

The purpose is to prevent an image with unacceptable Critical or High vulnerabilities from being published.

The security scan therefore acts as a basic security gate in the CI/CD pipeline.

---

## Q53. What is the most important improvement you made?

One major improvement was integrating security into the CI/CD workflow.

The original pipeline focused on build, test, packaging, Docker build, and Docker push.

I added Docker vulnerability scanning and container hardening so security became part of the delivery process.

---

## Q54. What did you learn from this project?

I learned how different DevOps components work together.

I gained practical experience with Jenkins pipelines, Docker, Docker Compose, GitHub, Docker Hub, Linux, vulnerability scanning, and DevSecOps.

I also learned that security should be considered throughout the development and deployment lifecycle.

---

# 14. Common DevOps Fundamentals

## Q55. What is Infrastructure as Code?

Infrastructure as Code means managing infrastructure using configuration files or code instead of manually configuring systems.

Terraform is an example of an Infrastructure as Code tool.

---

## Q56. What is Continuous Monitoring?

Continuous monitoring means continuously observing applications, infrastructure, performance, and security events to identify problems.

---

## Q57. What is Blue-Green Deployment?

Blue-Green Deployment uses two environments.

One environment runs the current version while the other contains the new version.

Traffic can then be switched between the environments after validation.

---

## Q58. What is Rolling Deployment?

Rolling Deployment gradually replaces instances of the old application version with the new version instead of replacing everything at once.

---

# 15. HR / Behavioral Questions

## Q59. Tell me about yourself.

I am Narinder Kumar, a Computer Science and Engineering student at MITE. I am currently in my seventh semester and have a strong interest in software development and DevOps. I have worked on projects involving Jenkins, Docker, GitHub, Linux, cloud technologies, and security scanning. Recently, I built a CI/CD pipeline for a Node.js application and improved it using DevSecOps practices. I am looking for an opportunity where I can apply my technical knowledge, learn from experienced engineers, and grow as a software professional.

---

## Q60. Why are you interested in DevOps?

I like DevOps because it combines development, automation, infrastructure, and problem solving.

While working on my Jenkins and Docker project, I enjoyed automating the process from source code to container deployment. That experience made me more interested in CI/CD, cloud, automation, and DevSecOps.

---

## Q61. What are your strengths?

My main strengths are willingness to learn, problem solving, and persistence.

When I face a technical issue, I try to understand the root cause instead of only looking for a temporary solution. My recent DevOps project also helped me improve my troubleshooting and security awareness.

---

## Q62. What is one area you are improving?

I am continuously improving my communication and technical explanation skills.

I have been practicing how to explain my projects and technical concepts in a clear and structured way so that I can communicate more confidently during interviews and teamwork.

---

## Q63. Why should we hire you?

I am a fresher with hands-on project experience and a strong willingness to learn.

I have worked practically with technologies such as Jenkins, Docker, Git, Linux, and CI/CD rather than only studying the theory. I am comfortable learning new tools and troubleshooting problems, and I would bring that learning attitude to the team.

---

# 16. Quick Revision

Before a DevOps interview, revise these topics:

```text
Git
 ├── clone
 ├── add
 ├── commit
 ├── push
 └── pull

Jenkins
 ├── Pipeline
 ├── Jenkinsfile
 ├── Stages
 ├── Credentials
 └── Webhooks

Docker
 ├── Image
 ├── Container
 ├── Dockerfile
 ├── Volume
 ├── Network
 └── Compose

Linux
 ├── ls
 ├── cd
 ├── chmod
 ├── ps
 ├── ss
 ├── systemctl
 └── grep

DevSecOps
 ├── npm audit
 ├── Docker Scout
 ├── Container Hardening
 ├── Security Gate
 └── Secure Credentials

Kubernetes
 ├── Pod
 ├── Deployment
 ├── Service
 └── Minikube

Cloud
 ├── S3
 ├── CloudFront
 ├── CloudWatch
 ├── SQS
 └── SNS
```

---

# 17. Project Answer Formula

When explaining any technical project, use this structure:

```text
1. What was the project?
2. Why did you build it?
3. What technologies did you use?
4. What exactly did you implement?
5. What problem did you face?
6. How did you solve it?
7. What was the result?
8. What did you learn?
```

This makes the answer structured and easier for the interviewer to follow.

---

# 18. Final Interview Tip

Do not try to memorize every answer word-for-word.

Understand the project and explain it naturally.

For the Jenkins CI/CD project, remember this flow:

```text
GitHub
   ↓
Jenkins
   ↓
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
Docker Scout Security Scan
   ↓
Security Gate
   ↓
Docker Push
   ↓
Docker/Compose Deployment
```

The most important point is to be able to explain **what you personally implemented, why you implemented it, and how you solved problems during the project**.
