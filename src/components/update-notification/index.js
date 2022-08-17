import React, {useEffect, useState} from 'react'
import {Banner, Button} from '@douyinfe/semi-ui'

import {IPC_FUNCTION} from '@shared'
import {polyfill} from '@/utils'

import styles from './styles.scss'

const {send, receive} = polyfill
const {QUIT_AND_INSTALL, SHOW_UPDATE_NOTIFICATION} = IPC_FUNCTION

const UpdateNotification = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    receive(SHOW_UPDATE_NOTIFICATION, () => setVisible(true))
  }, [])

  if (!visible) return null

  return (
    <div className={styles.update}>
      <Banner
        type="info"
        className={styles.updateBanner}
        fullMode={false}
        icon={null}
        closeIcon={null}
        title="Update Available"
        description="An update has been downloaded. Would you like to restart to update now?"
      >
        <div className={styles.updateBtns}>
          <Button theme="solid" type="tertiary" onClick={() => setVisible(false)}>
            Later
          </Button>
          <Button
            className={styles.btnConfirm}
            theme="solid"
            type="primary"
            onClick={() => send(QUIT_AND_INSTALL)}
          >
            Restart Now
          </Button>
        </div>
      </Banner>
    </div>
  )
}

export default UpdateNotification
