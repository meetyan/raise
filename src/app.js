import React, {useState} from 'react'
import {Layout} from '@douyinfe/semi-ui'

import {MODE, TRENDING_TYPE} from '@/config'
import {AppProvider} from '@/app-context'
import Index from '@/pages/index'

import 'nprogress/nprogress.css'
import '@/assets/styles/reset.scss'
import '@/assets/styles/global.scss'
import styles from '@/app.scss'

const {REPOSITORIES} = TRENDING_TYPE

const App = () => {
  const [context] = useState({
    trendingType: REPOSITORIES,
    mode: MODE.DARK, // system themes
  })

  return (
    <AppProvider value={context}>
      <Layout className={`components-layout-demo ${styles.layout}`}>
        <Index />
      </Layout>
    </AppProvider>
  )
}

export default App
