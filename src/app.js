import React, {useState} from 'react'
import {
  Button,
  Layout,
  Divider,
  Typography,
  Space,
  BackTop,
  Progress,
  Notification,
} from '@douyinfe/semi-ui'
import {IconArrowUp, IconMoon, IconRefresh, IconSetting, IconSun} from '@douyinfe/semi-icons'

import {RaiseHeader, RepositoryContent, DeveloperContent, SettingsModal} from '@/components'
import {MODE, TRENDING_TYPE} from '@/config'
import {useMode} from '@/hooks'

import '@/assets/styles/reset.scss'
import '@/assets/styles/global.scss'
import styles from '@/app.scss'

const {Footer} = Layout
const {Text} = Typography

const {REPOSITORIES, DEVELOPERS} = TRENDING_TYPE

const App = () => {
  const [trendingType, setTrendingType] = useState(REPOSITORIES)
  const [settingsModalVisible, setSettingsModalVisible] = useState(false)
  const [mode, setMode] = useMode()

  const trendingTypeButtonConfig = buttonType => {
    return trendingType === buttonType ? {type: 'primary', theme: 'solid'} : {}
  }

  return (
    <Layout className={`components-layout-demo ${styles.layout}`}>
      <RaiseHeader>
        <div className={styles.trendingType}>
          <Button
            {...trendingTypeButtonConfig(REPOSITORIES)}
            className={styles.trendingTypeButton}
            onClick={() => setTrendingType(REPOSITORIES)}
          >
            {REPOSITORIES}
          </Button>
          <Button
            {...trendingTypeButtonConfig(DEVELOPERS)}
            className={styles.trendingTypeButton}
            onClick={() => setTrendingType(DEVELOPERS)}
          >
            {DEVELOPERS}
          </Button>
        </div>
      </RaiseHeader>

      <div className={styles.settings}>
        <div className={styles.top}>
          <Button
            theme="borderless"
            onClick={() =>
              Notification.open({
                duration: 0,
                title: (
                  <div className={styles.progress}>
                    <Progress percent={50} />
                  </div>
                ),
                position: 'bottom',
              })
            }
          >
            <Space className={styles.left}>
              <IconRefresh />
              <Text>Refresh</Text>
            </Space>
          </Button>
          <Button
            theme="borderless"
            icon={mode === MODE.LIGHT ? <IconMoon /> : <IconSun />}
            onClick={setMode}
          />
          <Button
            theme="borderless"
            icon={<IconSetting />}
            onClick={() => setSettingsModalVisible(true)}
          />
        </div>

        <Divider />
      </div>

      {trendingType === REPOSITORIES ? <RepositoryContent /> : <DeveloperContent />}

      <Footer>
        <Divider />
        <div className={styles.copyright}>
          <Text strong>Raise © {new Date().getFullYear()} Jiajun Yan. All rights reserved.</Text>
        </div>
      </Footer>

      <SettingsModal visible={settingsModalVisible} setVisible={setSettingsModalVisible} />

      <BackTop className={styles.backTop}>
        <IconArrowUp />
      </BackTop>
    </Layout>
  )
}

export default App
