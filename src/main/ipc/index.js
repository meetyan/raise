import {app} from 'electron'

import {isMac} from '../config'

export const handleShowDockIcon = (_, visible) => {
  if (!isMac) return

  if (visible) {
    app.dock.show()
    return
  }

  app.dock.hide()
}
