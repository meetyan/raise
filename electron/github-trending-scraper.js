import {BrowserView, BrowserWindow} from 'electron'

const scraperScript = `function getHTML() {
  return new Promise((resolve, reject) => {
    resolve(document.documentElement.innerHTML)
  })
}

getHTML()`

const scrapeGithubTrending = async () => {
  const win = new BrowserWindow({width: 500, height: 600, show: false})
  const view = new BrowserView()

  win.setBrowserView(view)
  view.setBounds({x: 0, y: 0, width: 500, height: 600})

  await view.webContents.loadURL('https://www.whatismybrowser.com/detect/what-is-my-user-agent')
  return view.webContents.executeJavaScript(scraperScript)
}

export default scrapeGithubTrending
