import Store from 'electron-store'

import {STORAGE_KEY} from '@shared'

export const store = new Store({
  defaults: {
    [STORAGE_KEY.ENABLE_AUTO_UPDATE]: true,
  },
})
