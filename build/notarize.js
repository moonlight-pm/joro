require('dotenv').config()
const { notarize } = require('electron-notarize')

exports.default = async function notarizing (context) {
  const { appOutDir } = context
  const appName = context.packager.appInfo.productFilename
  return notarize({
    appBundleId: 'pm.moonlight.joro',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_PASSWORD
  })
}
