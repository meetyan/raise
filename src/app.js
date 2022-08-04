import React, {useEffect, useState} from 'react'
import {Button, Layout, Divider, Typography, BackTop, Toast, Empty} from '@douyinfe/semi-ui'
import {
  IconArrowUp,
  IconFilter,
  IconInfoCircle,
  IconMoon,
  IconRefresh,
  IconSetting,
  IconSun,
} from '@douyinfe/semi-icons'
import {IllustrationNoResult, IllustrationNoResultDark} from '@douyinfe/semi-illustrations'

import {RaiseHeader, RepositoryContent, DeveloperContent, SettingsModal} from '@/components'
import {MODE, TRENDING_TYPE} from '@/config'
import {useMode} from '@/hooks'
import {fetchRepositories, fetchDevelopers} from '@/io'
import {convert} from '@/utils'

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
  const [getListParams, setGetListParams] = useState({})
  const [loading, setLoading] = useState(false)
  const [empty, setEmpty] = useState(false)

  const Content = trendingType === REPOSITORIES ? RepositoryContent : DeveloperContent

  const trendingTypeButtonConfig = buttonType => {
    return trendingType === buttonType ? {type: 'primary', theme: 'solid'} : {}
  }

  const getList = async params => {
    if (loading) return

    setLoading(true)
    setList([])
    setGetListParams(params)
    setEmpty(false)

    try {
      const fetch = trendingType === REPOSITORIES ? fetchRepositories : fetchDevelopers
      const res = await fetch(convert(params))
      setList(res)
      setEmpty(!res.length)
    } catch (error) {
      console.log('An error occurred when calling getList. Params: ', params, error)
      Toast.error(
        'Oops. It looks like an error occurs. The server might be down. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    getList(getListParams)
  }

  useEffect(() => {
    getList()
  }, [trendingType])

  return (
    <Layout className={`components-layout-demo ${styles.layout}`}>
      <RaiseHeader
        right={
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
        }
      >
        <div className={styles.settings}>
          <div className={styles.top}>
            <Button theme="borderless" icon={<IconRefresh />} onClick={refresh} />
            <Button theme="borderless" icon={<IconFilter />} />
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
        </div>
      </RaiseHeader>

      <Divider />
      <Content list={list} getList={getList} loading={loading} />

      {empty ? (
        <Empty
          className={styles.empty}
          image={<IllustrationNoResult style={{width: 150, height: 150}} />}
          darkModeImage={<IllustrationNoResultDark style={{width: 150, height: 150}} />}
          description={
            <Text className={styles.emptyDescription}>
              {`It looks like we don’t have any trending ${
                trendingType === REPOSITORIES ? 'repositories' : 'developers'
              } for your choices.`}
            </Text>
          }
        />
      ) : null}

      <Footer>
        <Divider />
        <div className={styles.copyright}>
          <Text strong>© {new Date().getFullYear()} Raise. All rights reserved.</Text>
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
