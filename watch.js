const chalk = require('chalk')
const util = require('util')
const fs = require('fs-extra')
const path = require('path')
const babel = require('@babel/core')
const chokidar = require('chokidar')

console.clear()

const src = 'src'
const dest = 'dist'
const srcToDest = srcfile => dest + srcfile.slice(src.length)
const srcToFile = srcfile => srcfile.slice(src.length + 1)

const transformFile = async (...args) => new Promise((resolve, reject) => {
  babel.transformFile(...args, (error, result) => {
    if (error)
      reject(error)
    else
      resolve(result)
  })
})

const smartTransformFile = async (srcfile) => {
  const destfile = srcToDest(srcfile)
  const result = await transformFile(srcfile)
  await fs.outputFile(destfile, result.code)
}


const onUnlink = async srcfile => {
  await fs.remove(srcToDest(srcfile))
  console.log(chalk.redBright('-', srcToFile(srcfile)))
}
const onAdd = async srcfile => {
  if (srcfile.endsWith('.js')) {
    await smartTransformFile(srcfile)
    console.log(chalk.blueBright('+', srcToFile(srcfile)))
  }
  else {
    await fs.copy(srcfile, srcToDest(srcfile))
    console.log(chalk.greenBright('+', srcToFile(srcfile)))
  }
}
const onChage = async srcfile => {
  if (srcfile.endsWith('.js')) {
    await smartTransformFile(srcfile)
    console.log(chalk.blueBright('↺', srcToFile(srcfile)))
  }
  else {
    await fs.copy(srcfile, srcToDest(srcfile))
    console.log(chalk.greenBright('↺', srcToFile(srcfile)))
  }
}

const watcher = chokidar.watch(src, {
  ignoreInitial: false
})
watcher.on('add', onAdd)
watcher.on('change', onChage)
watcher.on('unlink', onUnlink)
watcher.on('unlinkDir', onUnlink)

require('./express.js')