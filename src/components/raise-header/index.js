import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {Button, Collapsible, Divider, Layout, Typography} from '@douyinfe/semi-ui'
import {
  IconFilter,
  IconInfoCircle,
  IconMoon,
  IconRefresh,
  IconSetting,
  IconSun,
} from '@douyinfe/semi-icons'
import {useScroll} from 'ahooks'

import {Filter, SettingsModal, AboutModal} from '@/components'
import {MODE, TRENDING_TYPE} from '@/config'
import {useMode, useTrendingType} from '@/hooks'
import Logo from '@/assets/images/logo.png'

import styles from './styles.scss'

const {Header} = Layout
const {Text} = Typography

const {REPOSITORIES, DEVELOPERS} = TRENDING_TYPE

const RaiseHeader = ({refresh, getList}) => {
  const filterRef = useRef()
  const scrollRef = useScroll()
  const [mode, setMode] = useMode()
  const [trendingType, setTrendingType] = useTrendingType()

  const [headerHeight, setHeaderHeight] = useState(0)
  const [showFilter, setShowFilter] = useState(false)
  const [settingsModalVisible, setSettingsModalVisible] = useState(false)
  const [aboutModalVisible, setAboutModalVisible] = useState(false)

  const trendingTypeButtonConfig = buttonType => {
    return trendingType === buttonType ? {type: 'primary', theme: 'solid'} : {}
  }

  const TrendingButton = ({type}) => {
    return (
      <Button
        {...trendingTypeButtonConfig(type)}
        className={styles.trendingTypeButton}
        onClick={() => {
          setTrendingType(type)
        }}
      >
        {type}
      </Button>
    )
  }

  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }

  useEffect(() => {
    setShowFilter(false)
    filterRef.current.reset()
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [trendingType])

  useLayoutEffect(() => {
    const [headerComponent] = document.getElementsByClassName(styles.header)
    setHeaderHeight(headerComponent.offsetHeight - 20)
  }, [])

  return (
    <>
      <Header
        className={styles.header}
        style={{
          boxShadow: scrollRef?.top || showFilter ? '0 8px 24px -2px rgba(0, 0, 0, 0.2)' : 'none',
        }}
      >
        <div className={styles.top}>
          <h1 className={styles.heading}>
            <Text strong>GitHub Trending</Text>
          </h1>

          <div className={styles.trendingType}>
            <TrendingButton
              type={REPOSITORIES}
              setType={setTrendingType}
              config={trendingTypeButtonConfig}
            />
            <TrendingButton
              type={DEVELOPERS}
              setType={setTrendingType}
              config={trendingTypeButtonConfig}
            />
          </div>
        </div>

        <div className={styles.settings}>
          <div className={styles.logo}>
            <img src={Logo} alt="logo" />
            <Text strong>Raise</Text>
          </div>
          <div className={styles.top}>
            <Button
              theme="borderless"
              icon={<IconRefresh />}
              onClick={() => {
                setShowFilter(false)
                refresh()
              }}
            />
            <Button theme="borderless" icon={<IconFilter />} onClick={toggleFilter} />
            <Button
              theme="borderless"
              icon={mode === MODE.LIGHT ? <IconMoon /> : <IconSun />}
              onClick={setMode}
            />
            <Button
              theme="borderless"
              icon={<IconInfoCircle />}
              onClick={() => setAboutModalVisible(true)}
            />
            <Button
              theme="borderless"
              icon={<IconSetting />}
              onClick={() => setSettingsModalVisible(true)}
            />
          </div>
        </div>

        <Divider style={{opacity: !scrollRef?.top || showFilter ? 1 : 0}} />

        <Collapsible isOpen={showFilter} keepDOM>
          <Filter ref={filterRef} getList={getList} />
        </Collapsible>
      </Header>

      <div style={{width: '100%', height: headerHeight || 0}}></div>

      <SettingsModal visible={settingsModalVisible} setVisible={setSettingsModalVisible} />
      <AboutModal visible={aboutModalVisible} setVisible={setAboutModalVisible} />
    </>
  )
}

export default RaiseHeader
