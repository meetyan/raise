import React from 'react'
import {Button, Divider, Modal, Space, Switch, Typography} from '@douyinfe/semi-ui'
import {IconExternalOpen} from '@douyinfe/semi-icons'

import {useBackTop, useDockIcon, useMode} from '@/hooks'
import {MODE, URL, VERSION, Z_INDEX} from '@/config'

import styles from './styles.scss'
import {isMac} from '@/utils'

const {Text} = Typography
const {open} = window.electron

const SettingsModal = ({visible, setVisible}) => {
  const [mode, setMode] = useMode()
  const [backTop, setBackTop] = useBackTop()
  const [dockIcon, setDockIcon] = useDockIcon()

  return (
    <Modal
      title="Settings"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      closeOnEsc={true}
      width={350}
      height={isMac ? 390 : 350}
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

          {isMac ? (
            <div className={styles.settingsItem}>
              <Text strong>Show app icon in dock</Text>
              <Switch checked={dockIcon} onChange={setDockIcon} />
            </div>
          ) : null}

          <Divider />

          <div className={styles.settingsItem}>
            <Space vertical align="start" spacing={2}>
              <Text strong>Automatic updates</Text>
              <Text link size="small">
                Check now
              </Text>
            </Space>
            <Switch checked />
          </div>

          <div className={styles.settingsItem}>
            <Text strong>Changelog</Text>
            <Button icon={<IconExternalOpen />} onClick={() => open(URL.CHANGELOG)}>
              Open
            </Button>
          </div>

          <Divider />
          <Text type="tertiary">Raise, version {VERSION}</Text>
        </Space>
      </div>
    </Modal>
  )
}

export default SettingsModal
