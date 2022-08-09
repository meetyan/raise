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
import {useMode, useOutsideClick, useTrendingType} from '@/hooks'
import Logo from '@/assets/images/logo.png'
import {IPC_FUNCTION} from '@shared'
import pkg from '@pkg'

import styles from './styles.scss'

const {Header} = Layout
const {Text} = Typography

const {REPOSITORIES, DEVELOPERS} = TRENDING_TYPE
const {SHOW_ABOUT_MODAL, SHOW_SETTINGS_MODAL} = IPC_FUNCTION

const RaiseHeader = ({refresh, getList, resetList}) => {
  const headerRef = useRef()
  const filterRef = useRef()
  const scrollRef = useScroll()
  const [mode, setMode] = useMode()
  const [trendingType, setTrendingType] = useTrendingType()

  const [headerHeight, setHeaderHeight] = useState(0)
  const [showFilter, setShowFilter] = useState(false)
  const [settingsModalVisible, setSettingsModalVisible] = useState(false)
  const [aboutModalVisible, setAboutModalVisible] = useState(false)

  useOutsideClick(headerRef, () => setShowFilter(false))

  const trendingTypeButtonConfig = buttonType => {
    return trendingType === buttonType ? {type: 'primary', theme: 'solid'} : {}
  }

  const TrendingButton = ({type}) => {
    return (
      <Button
        {...trendingTypeButtonConfig(type)}
        className={styles.trendingTypeButton}
        onClick={() => {
          if (trendingType === type) return
          resetList()
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

  useLayoutEffect(() => {
    const [headerComponent] = document.getElementsByClassName(styles.header)
    setHeaderHeight(headerComponent.offsetHeight - 20)
  }, [])

  useEffect(() => {
    setShowFilter(false)
    filterRef.current.reset()
  }, [trendingType])

  useEffect(() => {
    const {receive} = window.electron
    receive(SHOW_ABOUT_MODAL, () => setAboutModalVisible(true))
    receive(SHOW_SETTINGS_MODAL, () => setSettingsModalVisible(true))
  }, [])

  return (
    <>
      <div ref={headerRef}>
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
              <Text strong>{pkg.productName}</Text>
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
                onClick={() => setMode(mode === MODE.LIGHT ? MODE.DARK : MODE.LIGHT)}
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
      </div>

      <div style={{width: '100%', height: headerHeight || 0}}></div>

      <SettingsModal visible={settingsModalVisible} setVisible={setSettingsModalVisible} />
      <AboutModal visible={aboutModalVisible} setVisible={setAboutModalVisible} />
    </>
  )
}

export default RaiseHeader
