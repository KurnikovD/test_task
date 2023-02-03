const { exec } = require("child_process");
const fs = require('fs')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    fs.createReadStream('./templates/index.html').pipe(res)
})

app.get('/check',(req, res) => {
    exec('net user | find " ' + name + '  " || echo 0', (error, stdout, stderr) => {
        if (error){
            res.writeHeader(401, { 'Content-Type': 'text/html' });
            res.write(
                `<h3>Err, please try again!</h3>`
            );
            return;
        }
        if (stderr) {
            res.writeHeader(401, { 'Content-Type': 'text/html' });
            res.write(
                `<h3>Err, please try again!</h3>`
            );
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
        <form action="/" name="back"></form>`)
        if (stdout === '0\r\n'){
            res.write(`<label>Пользователя ${name} нет</label>`)
        }   else {
            res.write(`<label>Пользователя ${name} есть</label>`)
        }
        res.write(`<br><button form="back">Назад</button>
        </body>
        </html>`)
        res.send()
    })
})

const PORT = 3000
const HOST = "127.0.0.1"
app.listen(PORT, () => console.log(`Server up: http://loclhost:3000`))
