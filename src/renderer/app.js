import React, {useState} from 'react'
import {Button, Layout, Divider, Typography, Space, BackTop, Progress} from '@douyinfe/semi-ui'
import {IconArrowUp, IconMoon, IconRefresh, IconSetting} from '@douyinfe/semi-icons'

import {RaiseHeader, RepositoryContent, DeveloperContent} from '@/components'
import {switchMode} from './utils'

import '@/assets/styles/reset.scss'
import '@/assets/styles/global.scss'
import styles from '@/app.scss'
import {TRENDING_TYPE} from './config'
import SettingsModal from './components/settings-modal'

const {Footer} = Layout
const {Text} = Typography

const App = () => {
  const [trendingType, setTrendingType] = useState(TRENDING_TYPE.REPOSITORIES)
  const [settingsModalVisible, setSettingsModalVisible] = useState(true)

  return (
    <Layout className={`components-layout-demo ${styles.layout}`}>
      <RaiseHeader>
        <div className={styles.trendingType}>
          <Button
            {...(trendingType === TRENDING_TYPE.REPOSITORIES
              ? {type: 'primary', theme: 'solid'}
              : {})}
            className={styles.trendingTypeButton}
            onClick={() => setTrendingType(TRENDING_TYPE.REPOSITORIES)}
          >
            {TRENDING_TYPE.REPOSITORIES}
          </Button>
          <Button
            {...(trendingType === TRENDING_TYPE.DEVELOPERS
              ? {type: 'primary', theme: 'solid'}
              : {})}
            className={styles.trendingTypeButton}
            onClick={() => setTrendingType(TRENDING_TYPE.DEVELOPERS)}
          >
            {TRENDING_TYPE.DEVELOPERS}
          </Button>
        </div>
      </RaiseHeader>

      <div className={styles.settings}>
        <div className={styles.top}>
          <Button theme="borderless">
            <Space className={styles.left}>
              <IconRefresh />
              <Text>Refresh</Text>
            </Space>
          </Button>
          <Button theme="borderless" icon={<IconMoon />} onClick={switchMode} />
          <Button
            theme="borderless"
            icon={<IconSetting />}
            onClick={() => setSettingsModalVisible(true)}
          />
        </div>

        <Progress percent={50} aria-label="disk usage" style={{opacity: 1}} />

        <Divider />
      </div>

      {trendingType === TRENDING_TYPE.REPOSITORIES ? <RepositoryContent /> : <DeveloperContent />}

      <Footer>
        <Divider />
        <div className={styles.copyright}>
          <Text strong>Raise © {new Date().getFullYear()} Jiajun Yan. All rights reserved.</Text>
        </div>
      </Footer>

      <BackTop className={styles.backTop}>
        <IconArrowUp />
      </BackTop>

      <SettingsModal visible={settingsModalVisible} setVisible={setSettingsModalVisible} />
    </Layout>
  )
}

export default App
