// See https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/
// See https://philo.dev/notarizing-your-electron-application/

require('dotenv').config()
const fs = require('fs')
const path = require('path')
const {notarize} = require('electron-notarize')
const pkg = require('../package.json')

module.exports = async function (params) {
  if (process.platform !== 'darwin') {
    return
  }

  console.log('afterSign hook triggered', params)

  const appId = pkg.build.appId

  const appPath = path.join(params.appOutDir, `${params.packager.appInfo.productFilename}.app`)

  if (!fs.existsSync(appPath)) {
    console.log('skip')
    return
  }

  console.log(`Notarizing ${appId} found at ${appPath}`)

  try {
    await notarize({
      appBundleId: appId,
      appPath: appPath,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASSWORD,
    })
  } catch (error) {
    console.error(error)
  }

  console.log(`Done notarizing ${appId}`)
}
