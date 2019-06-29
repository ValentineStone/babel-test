const chalk = require('chalk')
const util = require('util')
const bodyParser = require('body-parser')
const babel = require('@babel/core')
const express = require('express')
const path = require('path')

const indexFile = path.resolve('dist', 'index.html')
const port = 3000
const host = '0.0.0.0'
const app = express()
app.use('*', (req, res, next) => {
  console.log('→', req.method, req.originalUrl)
  next()
})
app.use('/babel', bodyParser.text({ type: '*/*' }), (req, res) => {
  babel.transform(req.body, { filename: '.js' }, (error, result) => {
    if (error) {
      res.type('text/plain')
      res.send(error.toString())
    }
    else {
      res.type('application/javascript')
      res.send(result.code)
    }
  })
})
app.get(/^\/$/, (req, res) => res.sendFile(indexFile))
app.use(express.static('dist', { index: 'index.js', extensions: 'js' }))
app.use(express.static('public', { extensions: 'js' }))
app.use('/node_modules', express.static(path.resolve('node_modules')))

app.listen(port, host, () => console.log(chalk.cyanBright.underline('React:'), host + ':' + port))