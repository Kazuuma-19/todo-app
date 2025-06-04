# TODO App

## 🗺️ Infrastructure Architecture
![aws-todo-app drawio](https://github.com/user-attachments/assets/cfdc1ae7-5109-4ac8-a30a-8fc7d46349ff)

## 🛠️ Technologies Used
### 📦 Frontend
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-111827?logo=shadcnui&logoColor=white)
![SWR](https://img.shields.io/badge/SWR-000000?logo=swr&logoColor=white)
![Jotai](https://img.shields.io/badge/Jotai-000000)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

### ⚙️ Backend
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java_21-007396?logo=java&logoColor=white)

### 🧪 Testing
**Frontend:**  
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)
![MSW](https://img.shields.io/badge/MSW-FF6A00?logo=mockserviceworker&logoColor=white)
![React Testing Library](https://img.shields.io/badge/React_Testing_Library-E33332?logo=testing-library&logoColor=white)

**Backend:**  
![JUnit](https://img.shields.io/badge/JUnit-25A162?logo=junit5&logoColor=white)
![Mockito](https://img.shields.io/badge/Mockito-45B8D8)
![MockMvc](https://img.shields.io/badge/MockMvc-999999)
![Testcontainers](https://img.shields.io/badge/Testcontainers-2496ED)

### ✨ Format / Lint
**Frontend:**  
![Biome](https://img.shields.io/badge/Biome-60A5FA?logo=biome&logoColor=white)

**Backend:**  
![Spotless](https://img.shields.io/badge/Spotless-44CC11)
![Checkstyle](https://img.shields.io/badge/Checkstyle-DAA520)

### 🔐 Authentication
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)

### ☁️ Infrastructure
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-FF9900?logo=amazonaws&logoColor=white)

### 🔁 CI/CD
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)
![SonarQube](https://img.shields.io/badge/SonarQube-4E9BCD?logo=sonarqube&logoColor=white)  

### 📈 Monitoring / Logging  
![Sentry](https://img.shields.io/badge/Sentry-362D59?logo=sentry&logoColor=white)
![Datadog](https://img.shields.io/badge/Datadog-632CA6?logo=datadog&logoColor=white)

## 🚀 Getting Started
### 🧱 プロジェクトの初期化・実行
#### フロントエンド開発サーバーを起動（Vite）
```shell
make front
```

#### Spring Boot + DB の Docker コンテナを起動（ビルド込み）
```shell
make build-up
```

---

### 🧹 コンテナの停止・削除

#### コンテナを停止
```shell
make down
```

#### コンテナとボリュームを削除
```shell
make down-v
```

---

### 🐚 コンテナ操作

#### アプリケーション（Spring Boot）コンテナに入る
```shell
make exec
```

#### PostgreSQL にアクセスする（psqlコマンド起動）
```shell
make psql
```
