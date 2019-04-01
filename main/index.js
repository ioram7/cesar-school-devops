var express = require('express')
var app = express()

const content = "Trabalho Devops Pipeline - Build: " + process.env.BUILD_NAME

app.get('/', function (req, res) {
    res.send(content)
})

app.listen(8081, function () {
    console.log('App listening to port 8081!')
})