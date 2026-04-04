# Docker Instructions for Cypress Toolshop

This guide explains how to build, run, and publish the Dockerized Cypress test suite.

## Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
- A [Docker Hub](https://hub.docker.com/) account (if you plan to publish the image).

---

## 1. Build the Docker Image Local
Build the image from the root of the project where the `Dockerfile` is located. 

Replace `<your-username>` with your actual Docker Hub username.

```bash
docker build -t <your-username>/cypress-toolshop:latest .
```

---

## 2. Run the Tests Locally via Docker
Once built, you can run the entire test suite inside an isolated container.

### Default Run
This runs all 18 tests headlessly using the settings in `cypress.config.js`:
```bash
docker run -it --rm <your-username>/cypress-toolshop:latest
```

### Override the Base URL
If you want to test a different environment (e.g., staging vs production) without changing the code, you can pass a Cypress environment variable:
```bash
docker run -it --rm -e CYPRESS_baseUrl=https://staging.practice-software-testing.com <your-username>/cypress-toolshop:latest
```

---

## 3. Push to Docker Hub
To share your image or use it in CI/CD pipelines (like GitHub Actions), push it to Docker Hub.

**Step A:** Login to your Docker account from the terminal:
```bash
docker login
```

**Step B:** Push the image:
```bash
docker push <your-username>/cypress-toolshop:latest
```

---

## 4. Run from Anywhere
Once pushed to Docker Hub, anyone can run your test suite without needing to install Node.js, Cypress, or clone the repository:

```bash
docker run -it --rm <your-username>/cypress-toolshop:latest
```