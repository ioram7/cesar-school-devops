# Devops Pipeline
## Running Jenkins and GitLab
### Jenkins image

Jenkins Dockerfile content:
```
FROM jenkins/jenkins:lts
USER root
RUN apt-get update \
	&& apt-get install -y sudo \
	&& rm -rf /var/lib/apt/lists/*
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers
USER jenkins
```
Build Jenkins image:
```
docker build --tag jenkins-devops:latest ./jenkins/
```
Run the services:
```
docker-compose up -d
```

Installing dependeces:
```
npm install
````

Running the application locally:
```
npm start
```