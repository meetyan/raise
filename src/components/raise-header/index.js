import React, {useLayoutEffect, useRef, useState} from 'react'
import {Layout, Typography} from '@douyinfe/semi-ui'
import {IconGithubLogo} from '@douyinfe/semi-icons'

import styles from './styles.scss'
import {useScroll} from 'ahooks'

const {Header} = Layout
const {Text} = Typography

const RaiseHeader = ({children, right}) => {
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef(null)
  const scrollRef = useScroll()

  useLayoutEffect(() => {
    if (!headerRef?.current) return

    const [headerComponent] = document.getElementsByClassName(styles.header)
    setHeaderHeight(headerComponent.offsetHeight - 20)
  }, [])

  return (
    <>
      <Header
        className={styles.header}
        ref={headerRef}
        style={{
          boxShadow: scrollRef?.top > headerHeight ? '0 8px 24px -2px rgba(0, 0, 0, 0.2)' : 'none',
        }}
      >
        <div className={styles.top}>
          <h1 className={styles.heading}>
            <IconGithubLogo />
            <Text className={styles.headingTitle}>Trending</Text>
          </h1>

          {right}
        </div>
        {children}
      </Header>

      <div style={{width: '100%', height: headerHeight || 0}}></div>
    </>
  )
}

export default RaiseHeader
