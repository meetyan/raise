import React, {useLayoutEffect, useRef, useState} from 'react'
import {Divider, Layout, Typography} from '@douyinfe/semi-ui'

import {MODE, TRENDING_TYPE} from '@/config'
import {AppProvider} from '@/app-context'
import {UpperContainer} from '@/components'
import Index from '@/pages/index/index'

import 'nprogress/nprogress.css'
import '@/assets/styles/reset.scss'
import '@/assets/styles/global.scss'
import styles from '@/app.scss'

const {Text} = Typography
const {Footer} = Layout

const {REPOSITORIES} = TRENDING_TYPE

const App = () => {
  const footerRef = useRef()

  const [context] = useState({
    trendingType: REPOSITORIES,
    mode: MODE.DARK, // system themes
  })
  const [footerHeight, setFooterHeight] = useState(0)

  useLayoutEffect(() => {
    if (!footerRef?.current) return

    const footerComponent = document.getElementById('footer')
    setFooterHeight(footerComponent.offsetHeight)
  }, [footerRef])

  return (
    <AppProvider value={context}>
      <Layout className={`components-layout-demo ${styles.layout}`}>
        <UpperContainer footerHeight={footerHeight}>
          <Index />
        </UpperContainer>

        <Footer id="footer" ref={footerRef}>
          <Divider />
          <div className={styles.copyright}>
            <Text strong>© {new Date().getFullYear()} Raise. All rights reserved.</Text>
          </div>
        </Footer>
      </Layout>
    </AppProvider>
  )
}

export default App
