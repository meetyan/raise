import React, {useEffect, useState} from 'react'
import {Button, Layout, Divider, Typography, BackTop} from '@douyinfe/semi-ui'
import {IconArrowUp, IconInfoCircle, IconMoon, IconSetting, IconSun} from '@douyinfe/semi-icons'

import {
  RaiseHeader,
  RepositoryContent,
  DeveloperContent,
  SettingsModal,
  RefreshButton,
} from '@/components'
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
  const [list, setList] = useState([])

  const Content = trendingType === REPOSITORIES ? RepositoryContent : DeveloperContent

  const trendingTypeButtonConfig = buttonType => {
    return trendingType === buttonType ? {type: 'primary', theme: 'solid'} : {}
  }

  const getRepoList = async () => {
    const result = await window.electron.crawl()
    setList(result)
  }

  useEffect(() => {
    console.log('called')
    getRepoList()
  }, [])

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
            icon={mode === MODE.LIGHT ? <IconMoon /> : <IconSun />}
            onClick={setMode}
          />
          <Button theme="borderless" icon={<IconInfoCircle />} />
          <Button
            theme="borderless"
            icon={<IconSetting />}
            onClick={() => setSettingsModalVisible(true)}
          />
        </div>

        <Divider />
      </div>

      <Content list={list} />

      {list.length ? (
        <Footer>
          <Divider />
          <div className={styles.copyright}>
            <Text strong>© {new Date().getFullYear()} Raise. All rights reserved.</Text>
          </div>
        </Footer>
      ) : null}

      <SettingsModal visible={settingsModalVisible} setVisible={setSettingsModalVisible} />

      <BackTop className={styles.backTop}>
        <IconArrowUp />
      </BackTop>

      <RefreshButton />
    </Layout>
  )
}

export default App
