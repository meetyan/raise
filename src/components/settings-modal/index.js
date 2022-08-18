import React from 'react'
import {Button, Divider, Modal, Space, Switch, Typography} from '@douyinfe/semi-ui'
import {IconExternalOpen} from '@douyinfe/semi-icons'

import {useAutoUpdate, useBackTop, useDockIcon, useMode} from '@/hooks'
import {MODE, URL, VERSION, Z_INDEX, isMac, isElectron} from '@/config'
import {polyfill} from '@/utils'
import pkg from '@pkg'

import styles from './styles.scss'

const {Text} = Typography
const {open} = polyfill

const SettingsModal = ({visible, setVisible}) => {
  const [mode, setMode] = useMode()
  const [backTop, setBackTop] = useBackTop()
  const [dockIcon, setDockIcon] = useDockIcon()
  const [autoUpdate, setAutoUpdate] = useAutoUpdate()

  return (
    <Modal
      title="Settings"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      closeOnEsc={true}
      width={350}
      height="fit-content"
      centered
      footer={null}
      zIndex={Z_INDEX.MODAL}
    >
      <Divider />
      <div className={styles.settingsModal}>
        <Space style={{width: '100%'}} vertical spacing="medium" align="start">
          <div className={styles.settingsItem}>
            <Text strong>Dark mode</Text>
            <Switch
              checked={mode === MODE.DARK}
              onChange={e => {
                setMode(e ? MODE.DARK : MODE.LIGHT)
              }}
            />
          </div>

          <div className={styles.settingsItem}>
            <Text strong>Show back to top button</Text>
            <Switch checked={backTop} onChange={setBackTop} />
          </div>

          {isMac && isElectron ? (
            <div className={styles.settingsItem}>
              <Text strong>Show app icon in dock</Text>
              <Switch checked={dockIcon} onChange={setDockIcon} />
            </div>
          ) : null}

          <Divider />

          {isElectron ? (
            <div className={styles.settingsItem}>
              <Text strong>Automatic updates</Text>
              <Switch checked={autoUpdate} onChange={setAutoUpdate} />
            </div>
          ) : null}

          <div className={styles.settingsItem}>
            <Text strong>Changelog</Text>
            <Button icon={<IconExternalOpen />} onClick={() => open(URL.CHANGELOG)}>
              Open
            </Button>
          </div>

          <Divider />
          <Text type="tertiary" className={styles.version}>
            {pkg.productName}, version {VERSION}
          </Text>
        </Space>
      </div>
    </Modal>
  )
}

export default SettingsModal
