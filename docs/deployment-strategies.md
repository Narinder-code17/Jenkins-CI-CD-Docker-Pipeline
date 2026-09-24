# Deployment Strategies

## 1. Introduction

Deployment strategy defines how a new version of an application is released to users while maintaining application availability and reducing deployment-related risks.

Two commonly used deployment strategies are:

* Blue-Green Deployment
* Rolling Deployment

Both strategies can be implemented with containerized applications and integrated with CI/CD pipelines such as Jenkins.

---

# 2. Blue-Green Deployment

## 2.1 Definition

Blue-Green Deployment maintains two separate production environments:

* **Blue Environment** – currently serving the live application.
* **Green Environment** – contains the new application version.

Only one environment receives production traffic at a time.

## 2.2 Working

The deployment process generally follows these steps:

1. The existing application runs in the Blue environment.
2. A new version of the application is deployed to the Green environment.
3. The Green environment is tested and verified.
4. Once validation is complete, traffic is switched from Blue to Green.
5. Green becomes the active production environment.
6. The previous Blue environment can be kept temporarily for rollback.

### Example

```text
                 Users
                   |
                   v
              Load Balancer
                   |
          +--------+--------+
          |                 |
       Blue              Green
     Version 1          Version 2
       LIVE              TEST
```

After successful validation:

```text
                 Users
                   |
                   v
              Load Balancer
                   |
          +--------+--------+
          |                 |
       Blue              Green
     Version 1          Version 2
       OLD               LIVE
```

## 2.3 Advantages

* Enables quick switching between application versions.
* Provides a straightforward rollback mechanism.
* Allows the new version to be tested before receiving production traffic.
* Reduces downtime during deployment.

## 2.4 Limitations

* Requires two application environments.
* Can require additional infrastructure resources.
* Database changes may require careful backward-compatibility planning.
* Maintaining two environments can increase operational complexity.

---

# 3. Rolling Deployment

## 3.1 Definition

Rolling Deployment gradually replaces instances running the old application version with instances running the new version.

Instead of replacing all instances at once, the deployment occurs in smaller batches.

## 3.2 Working

The deployment process generally follows these steps:

1. The application initially runs multiple instances of the old version.
2. A small number of old instances are stopped or taken out of service.
3. New-version instances are deployed.
4. The new instances are checked for successful operation.
5. Additional old instances are gradually replaced.
6. The process continues until all instances use the new version.

### Example

Initial state:

```text
Instance 1 → Version 1
Instance 2 → Version 1
Instance 3 → Version 1
Instance 4 → Version 1
```

During deployment:

```text
Instance 1 → Version 2
Instance 2 → Version 1
Instance 3 → Version 1
Instance 4 → Version 1
```

Later:

```text
Instance 1 → Version 2
Instance 2 → Version 2
Instance 3 → Version 2
Instance 4 → Version 1
```

Final state:

```text
Instance 1 → Version 2
Instance 2 → Version 2
Instance 3 → Version 2
Instance 4 → Version 2
```

## 3.3 Advantages

* Does not require a completely separate production environment.
* Gradually introduces the new application version.
* Can reduce resource requirements compared with maintaining two complete environments.
* Allows issues to be detected during the gradual rollout.

## 3.4 Limitations

* Old and new versions may run simultaneously during deployment.
* Rollback can be more complex than switching between two complete environments.
* Application versions may need to remain compatible during the transition.
* Deployment configuration must carefully control the number of instances updated at each stage.

---

# 4. Blue-Green vs Rolling Deployment

| Feature                 | Blue-Green Deployment                               | Rolling Deployment                   |
| ----------------------- | --------------------------------------------------- | ------------------------------------ |
| Production environments | Two environments                                    | Usually one environment              |
| Deployment method       | Switch traffic between environments                 | Gradually replace instances          |
| Rollback                | Generally quick by switching traffic back           | Requires reverting updated instances |
| Resource requirement    | Higher                                              | Usually lower                        |
| Version overlap         | Separate environments                               | Old and new versions may coexist     |
| Deployment risk control | Test complete new environment before traffic switch | Gradual rollout                      |
| Downtime                | Can be minimized                                    | Can be minimized                     |
| Complexity              | Requires environment duplication                    | Requires controlled rollout          |

---

# 5. Relation to Jenkins and Docker

The Jenkins CI/CD pipeline developed in this project performs automated application delivery using Docker.

The pipeline performs:

```text
GitHub
   |
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
```

The Docker image generated by the pipeline can later be used as the deployment artifact.

For example:

```text
narinder15/jenkins-ci-cd-docker-pipeline:5
```

This image can be deployed using either a Blue-Green or Rolling Deployment strategy in a suitable container orchestration or deployment environment.

---

# 6. Conclusion

Blue-Green Deployment and Rolling Deployment provide different approaches for releasing new application versions.

Blue-Green Deployment focuses on maintaining two environments and switching traffic between them, while Rolling Deployment gradually replaces instances running the previous version.

The Jenkins and Docker pipeline developed in this project prepares a versioned Docker image that can serve as the deployment artifact for these strategies.
