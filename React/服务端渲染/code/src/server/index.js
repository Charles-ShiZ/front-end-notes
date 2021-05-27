import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../App'
let express = require('express')
let path = require('path')
let app = express()
app.use(express.static(path.resolve('build')))

app.get('/', (req, res)=>{
    const html = renderToString(<App/>)
    res.send(
        `
            <html>
                <head>
                    <title>服务端渲染</title>
                </head>
                <body>
                    <div id="root">${html}</div>
                </body>
                <script src="./client.js"></script>
            </html>
        `
    )
})

app.listen(3000,()=>{
    console.log('server 3000')
})