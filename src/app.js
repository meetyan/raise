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
import {fetchRepositories, fetchDevelopers} from '@/io'

import 'nprogress/nprogress.css'
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

  const convert = params => {
    if (!params) return params

    return Object.entries(params)
      .map(([key, value]) => {
        value = value === 'any' ? '' : value
        return [key, value]
      })
      .reduce((final, item) => {
        const [key, value] = item
        final[key] = value
        return final
      }, {})
  }

  const getList = async params => {
    const fetch = trendingType === REPOSITORIES ? fetchRepositories : fetchDevelopers
    const res = await fetch(convert(params))
    setList(res)
  }

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    console.log('trendingType', trendingType)
    setList([])
    getList()
  }, [trendingType])

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

      <Content list={list} getList={getList} />

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
