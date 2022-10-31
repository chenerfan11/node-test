const fs = require('fs')

const useRoutes = function() {
  const files = fs.readdirSync(__dirname)
  files.forEach(file => {
    if (file == 'index.js') return
    const fileRoute = require(`./${file}`)
    this.use(fileRoute.routes())
    this.use(fileRoute.allowedMethods())
  })
}

module.exports = useRoutes