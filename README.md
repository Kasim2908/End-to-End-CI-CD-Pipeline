# 🚀End-to-End CI/CD Pipeline using Jenkins, Docker, Kubernetes & AWS

<div align="center">

![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

**A complete CI/CD automation pipeline demonstrating continuous integration and deployment using modern DevOps tools.**

</div>

---

## 📌 Project Overview

This repository showcases a fully automated **CI/CD pipeline** that builds, tests, and deploys a web application using industry-standard DevOps practices.

### ✨ Key Features

| Feature | Status |
|---------|--------|
| GitHub Push Trigger | ✅ Working |
| Automated Docker Build | ✅ Working |
| Docker Hub Push | ✅ Working |
| Container Deployment | ✅ Working |
| Email Notifications | 🔧 In Progress |

---

## 🏗️ Architecture Overview

```mermaid
flowchart TB
    subgraph Developer[" Developer "]
        A[Code Changes]
    end
    
    subgraph GitHub[" GitHub "]
        B[Repository]
        C[Webhook]
    end
    
    subgraph Jenkins[" Jenkins Server "]
        D[Pipeline Trigger]
        E[Checkout Code]
        F[Build Docker Image]
        G[Push to Registry]
        H[Deploy Container]
    end
    
    subgraph DockerHub[" Docker Hub "]
        I[Image Registry]
    end
    
    subgraph AWS[" AWS EC2 "]
        J[Nginx Container]
        K[Web Application]
    end
    
    A -->|git push| B
    B -->|trigger| C
    C -->|webhook| D
    D --> E
    E --> F
    F --> G
    G -->|push| I
    I -->|pull| H
    H --> J
    J --> K

    style A fill:#e1f5fe,stroke:#01579b,color:#000000
    style B fill:#e8f5e9,stroke:#2e7d32,color:#000000
    style C fill:#e8f5e9,stroke:#2e7d32,color:#000000
    style D fill:#fff3e0,stroke:#e65100,color:#000000
    style E fill:#fff3e0,stroke:#e65100,color:#000000
    style F fill:#fff3e0,stroke:#e65100,color:#000000
    style G fill:#fff3e0,stroke:#e65100,color:#000000
    style H fill:#fff3e0,stroke:#e65100,color:#000000
    style I fill:#e3f2fd,stroke:#1565c0,color:#000000
    style J fill:#fce4ec,stroke:#c2185b,color:#000000
    style K fill:#fce4ec,stroke:#c2185b,color:#000000
```

---

## 🔄 CI/CD Pipeline Flow

```mermaid
flowchart LR
    subgraph CI[" Continuous Integration "]
        A[Checkout] --> B[Docker Login]
        B --> C[Build Image]
    end
    
    subgraph CD[" Continuous Deployment "]
        C --> D[Push to Hub]
        D --> E[Stop Old Container]
        E --> F[Remove Old Container]
        F --> G[Run New Container]
    end
    
    subgraph Notify[" Notification "]
        G --> H{Success?}
        H -->|Yes| I[Success Email]
        H -->|No| J[Failure Email]
    end

    style A fill:#bbdefb,stroke:#1976d2,color:#000000
    style B fill:#bbdefb,stroke:#1976d2,color:#000000
    style C fill:#bbdefb,stroke:#1976d2,color:#000000
    style D fill:#c8e6c9,stroke:#388e3c,color:#000000
    style E fill:#c8e6c9,stroke:#388e3c,color:#000000
    style F fill:#c8e6c9,stroke:#388e3c,color:#000000
    style G fill:#c8e6c9,stroke:#388e3c,color:#000000
    style H fill:#fff9c4,stroke:#f9a825,color:#000000
    style I fill:#c8e6c9,stroke:#388e3c,color:#000000
    style J fill:#ffcdd2,stroke:#d32f2f,color:#000000
```

---

## 📂 Project Structure

```
CI-CD-FIRST/
│
├── 📄 index.html          # Main web application page
├── 🎨 style.css           # Application styling
├── ⚡ script.js           # Interactive functionality
├── 🐳 Dockerfile          # Container build instructions
├── 🔧 Jenkinsfile         # CI/CD pipeline definition
└── 📖 README.md           # Project documentation
```

### File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | Demo web page displaying CI/CD pipeline status with interactive elements |
| `style.css` | Modern CSS styling with gradient headers and responsive design |
| `script.js` | JavaScript for simulating deployment status animations |
| `Dockerfile` | Nginx-based container configuration for serving the web app |
| `Jenkinsfile` | Complete pipeline with 5 stages + email notifications |

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Source Control** | GitHub, Webhooks |
| **CI/CD Engine** | Jenkins, Pipeline as Code |
| **Containerization** | Docker, Nginx |
| **Registry** | Docker Hub |
| **Cloud** | AWS EC2, Ubuntu |
| **Notifications** | Email Plugin |

---

## 📜 Pipeline Stages

```mermaid
sequenceDiagram
    participant G as GitHub
    participant J as Jenkins
    participant D as Docker
    participant DH as Docker Hub
    participant EC2 as AWS EC2
    
    G->>J: Webhook Trigger (Push Event)
    J->>J: Checkout SCM
    J->>D: Docker Login
    D-->>J: Authenticated
    J->>D: Build Image
    D-->>J: Image Built
    J->>DH: Push Image
    DH-->>J: Image Pushed
    J->>EC2: Stop & Remove Old Container
    J->>EC2: Run New Container (Port 8081)
    EC2-->>J: Container Running
    J->>J: Send Email Notification
```

---

## ⚙️ Jenkinsfile Configuration

```groovy
pipeline {
    agent any

    environment {
        IMAGE_NAME     = "mohammadkasim/cicd-demo"
        CONTAINER_NAME = "cicd-demo-app"
    }

    stages {
        stage('Checkout SCM')          { /* Clone repository */ }
        stage('Docker Login')          { /* Authenticate with Docker Hub */ }
        stage('Build Image')           { /* Build Docker image */ }
        stage('Push Image to DockerHub') { /* Push to registry */ }
        stage('Run Container')         { /* Deploy on EC2 */ }
    }

    post {
        success { /* Send success email */ }
        failure { /* Send failure email */ }
        always  { /* Log completion */ }
    }
}
```

---

## 🐳 Docker Configuration

```dockerfile
FROM nginx:latest
COPY . /usr/share/nginx/html/
```

The application runs on **Nginx** web server inside a Docker container:
- **Base Image:** `nginx:latest`
- **Exposed Port:** `80` (mapped to `8081` on host)
- **Content Location:** `/usr/share/nginx/html/`

---

## 🚀 Deployment Flow

```mermaid
flowchart TD
    A([Start]) --> B[Developer Pushes Code]
    B --> C[GitHub Sends Webhook]
    C --> D[Jenkins Pipeline Starts]
    D --> E[Checkout Code]
    E --> F[Docker Login]
    F --> G[Build Image]
    G --> H[Push to Docker Hub]
    H --> I[Deploy Container]
    I --> J[Application Live on Port 8081]
    J --> K([End])

    style A fill:#e8f5e9,stroke:#2e7d32,color:#000000
    style B fill:#e3f2fd,stroke:#1565c0,color:#000000
    style C fill:#e3f2fd,stroke:#1565c0,color:#000000
    style D fill:#fff3e0,stroke:#ef6c00,color:#000000
    style E fill:#fff3e0,stroke:#ef6c00,color:#000000
    style F fill:#fff3e0,stroke:#ef6c00,color:#000000
    style G fill:#fff3e0,stroke:#ef6c00,color:#000000
    style H fill:#e1f5fe,stroke:#0288d1,color:#000000
    style I fill:#f3e5f5,stroke:#7b1fa2,color:#000000
    style J fill:#c8e6c9,stroke:#388e3c,color:#000000
    style K fill:#e8f5e9,stroke:#2e7d32,color:#000000
```

---

## 🖥️ Web Application Features

The demo web application includes:

- **Header:** Displays pipeline status with deployment timestamp
- **Status Panel:** Real-time deployment status indicator
- **Simulate Button:** Interactive deployment simulation
- **Pipeline Steps:** Visual representation of the CI/CD flow
- **Responsive Design:** Modern gradient styling

### Application Preview

| Component | Description |
|-----------|-------------|
| Header | Blue gradient with deployment info |
| Status Card | Shows pending/success states |
| Pipeline Flow | Step-by-step visual guide |
| Footer | Project attribution |

---

## 📧 Email Notifications

The pipeline is configured to send email notifications:

| Event | Recipient | Subject |
|-------|-----------|---------|
| Success | Configured email | ✅ Jenkins SUCCESS: {JOB_NAME} #{BUILD_NUMBER} |
| Failure | Configured email | ❌ Jenkins FAILED: {JOB_NAME} #{BUILD_NUMBER} |

> **Note:** Email notifications require proper SMTP configuration in Jenkins.

---

## 🔧 Prerequisites

To run this pipeline, ensure you have:

- [ ] Jenkins server (can run in Docker)
- [ ] Docker installed on Jenkins agent
- [ ] Docker Hub account and credentials
- [ ] GitHub repository with webhook configured
- [ ] AWS EC2 instance (optional for cloud deployment)

---

## 🏃 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kasim2908/CI-CD-FIRST.git
   ```

2. **Configure Jenkins credentials**
   - Add Docker Hub credentials with ID: `dockerhub-creds`

3. **Set up GitHub Webhook**
   - URL: `http://<jenkins-url>/github-webhook/`
   - Events: Push

4. **Run the pipeline**
   - Push any change to trigger automatic deployment

---

## 📊 Pipeline Execution Summary

```mermaid
pie title Pipeline Stage Duration
    "Checkout" : 5
    "Docker Login" : 3
    "Build Image" : 40
    "Push to Hub" : 25
    "Deploy Container" : 15
    "Notifications" : 2
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by DevOps Engineer | CI/CD Automation Project**

                """,
                to: "your-email@example.com"
            )
        }
    }
}
