import React, {useState} from 'react'
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
  const [context] = useState({
    trendingType: REPOSITORIES,
    mode: MODE.DARK, // system themes
  })

  return (
    <AppProvider value={context}>
      <Layout className={`components-layout-demo ${styles.layout}`}>
        <UpperContainer>
          <Index />
        </UpperContainer>

        <Footer id="footer">
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
