const fs = require('fs')

module.exports = () => {
  const path = './out/'
  const regex = /^builder.*\.y(am|m)l$/

  fs.readdirSync(path)
    .filter(f => regex.test(f))
    .map(f => fs.unlinkSync(path + f))
}
