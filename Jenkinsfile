def imageName = "${JOB_NAME}-${BUILD_NUMBER}"
def containerName = "${imageName}_service"
def isDockerRunning = ""

node {
    stage('Build') {
        echo 'Building...'
        echo 'Removing old containers...'
        try {
            sh 'sudo docker ps --filter name=devops* -aq | sudo xargs docker stop 2>/dev/null'
        }
        catch (e) { 
            if(e.toString().indexOf('script returned exit code 123') != -1) {
                echo 'No docker container running...'
            } else {
                echo 'Error while trying to remove previous docker containers.'
            }
        }
        deleteDir()
        checkout scm
        stash includes: '**/*', name: 'app'
        sh "sudo docker build -t ${imageName} ."
    }
    stage('Test') {
        echo 'Testing...'
        parallel UnitTests: { sh "sudo docker run --rm --name ${imageName}_unit_tests ${imageName} npm run unit" },
                IntegrationTests: { 
                    retry(5) {
                        sh "sudo docker run --rm --name ${imageName}_integration_tests ${imageName} npm run integration"
                    }
                }
    }
    stage('Deliver to AWS') {
        echo 'AWS...'
        deleteDir()
        unstash 'app'
        withAWS(credentials: 'aws-ioram') {
            env.AWS_DEFAULT_REGION = 'us-east-2'
            s3Upload (bucket:"devops-school",
                path:'devops/',
                includePathPattern: '**/*',
                excludePathPattern:'**/*.svg')
        }
    }
    stage('Run application') {
        echo 'Runing dockerized appplication...'
        sh "sudo docker run --rm -d -p 8081:8081 -e BUILD_NAME='${imageName}' --name ${containerName} ${imageName} npm start"
        isDockerRunning = sh (
            script: "sudo docker ps | grep ${containerName} | wc -l",
            returnStdout: true
        ).trim()
        if(isDockerRunning == "1") {
            echo "The application ${imageName} is running and accessible at http://localhost:8081"
        } else {
            echo "Something went wrong. Docker container ${containerName} is not running."
        }
    }
    stage('Clean Up') {
        echo 'Cleaning...'
        deleteDir()
    }
}
