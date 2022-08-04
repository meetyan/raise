import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {Button, Collapsible, Layout, Typography} from '@douyinfe/semi-ui'
import {
  IconFilter,
  IconGithubLogo,
  IconInfoCircle,
  IconMoon,
  IconRefresh,
  IconSetting,
  IconSun,
} from '@douyinfe/semi-icons'
import {useScroll} from 'ahooks'

import {Filter, SettingsModal} from '@/components'
import {MODE} from '@/config'
import {useMode} from '@/hooks'

import styles from './styles.scss'

const {Header} = Layout
const {Text} = Typography

const RaiseHeader = ({right, refresh, trendingType, getList}) => {
  const headerRef = useRef()
  const filterRef = useRef()
  const scrollRef = useScroll()
  const [mode, setMode] = useMode()

  const [headerHeight, setHeaderHeight] = useState(0)
  const [showFilter, setShowFilter] = useState(false)
  const [settingsModalVisible, setSettingsModalVisible] = useState(false)

  useEffect(() => {
    setShowFilter(false)
    filterRef.current.reset()
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [trendingType])

  useLayoutEffect(() => {
    if (!headerRef?.current) return

    const [headerComponent] = document.getElementsByClassName(styles.header)
    setHeaderHeight(headerComponent.offsetHeight - 20)
  }, [])

  const toggleFilter = () => {
    setShowFilter(!showFilter)
  }

  return (
    <>
      <Header
        className={styles.header}
        ref={headerRef}
        style={{
          boxShadow:
            scrollRef?.top > headerHeight || showFilter
              ? '0 8px 24px -2px rgba(0, 0, 0, 0.2)'
              : 'none',
        }}
      >
        <div className={styles.top}>
          <h1 className={styles.heading}>
            <IconGithubLogo />
            <Text className={styles.headingTitle}>Trending</Text>
          </h1>

          {right}
        </div>

        <div className={styles.settings}>
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
            <Button theme="borderless" icon={<IconInfoCircle />} />
            <Button
              theme="borderless"
              icon={<IconSetting />}
              onClick={() => setSettingsModalVisible(true)}
            />
          </div>
        </div>

        <Collapsible isOpen={showFilter} keepDOM>
          <Filter ref={filterRef} trendingType={trendingType} getList={getList} />
        </Collapsible>
      </Header>

      <div style={{width: '100%', height: headerHeight || 0}}></div>

      <SettingsModal visible={settingsModalVisible} setVisible={setSettingsModalVisible} />
    </>
  )
}

export default RaiseHeader
