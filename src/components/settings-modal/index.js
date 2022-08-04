import React, {useState} from 'react'
import {Button, Divider, Modal, Space, Switch, Typography} from '@douyinfe/semi-ui'
import {IconExternalOpen} from '@douyinfe/semi-icons'

import {useMode} from '@/hooks'
import {MODE} from '@/config'

import styles from './styles.scss'

const {Text} = Typography

const SettingsModal = ({visible, setVisible}) => {
  const [mode, setMode] = useMode()
  const [isDarkMode, setIsDarkMode] = useState(mode === MODE.DARK)

  return (
    <Modal
      title="Settings"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      closeOnEsc={true}
      width={350}
      height={300}
      centered
      footer={null}
      zIndex={99999}
    >
      <Divider />
      <div className={styles.settingsModal}>
        <Space style={{width: '100%'}} vertical spacing="medium" align="start">
          <div className={styles.settingsItem}>
            <Text strong>Dark mode</Text>
            <Switch
              checked={isDarkMode}
              onChange={e => {
                console.log('e', e)
                setMode()
                setIsDarkMode(e)
              }}
            />
          </div>

          <div className={`${styles.settingsItem}`}>
            <Space vertical align="start" spacing={2}>
              <Text strong>Automatic updates</Text>
              <Text link size="small">
                Check now
              </Text>
            </Space>
            <Switch checked />
          </div>

          <div className={styles.settingsItem}>
            <Text strong>Open in detached window</Text>
            <Button icon={<IconExternalOpen />}>Open</Button>
          </div>
        </Space>

        <Text type="tertiary">Raise version 1.0.0</Text>
      </div>
    </Modal>
  )
}

export default SettingsModal
