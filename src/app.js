import React, {useState} from 'react'
import {Divider, Layout, Toast, Typography} from '@douyinfe/semi-ui'

import {MODE, TRENDING_TYPE, Z_INDEX} from '@/config'
import {AppProvider} from '@/app-context'
import {UpdateNotification, UpperContainer} from '@/components'
import Index from '@/pages/index/index'
import {polyfill} from '@/utils'
import pkg from '@pkg'
import {STORAGE_KEY} from '@shared'

import 'nprogress/nprogress.css'
import '@/assets/styles/reset.scss'
import '@/assets/styles/global.scss'
import styles from '@/app.scss'

const {Text} = Typography
const {Footer} = Layout

Toast.config({zIndex: Z_INDEX.TOAST})

const {REPOSITORIES} = TRENDING_TYPE
const {getContextFromStorage} = polyfill

const App = () => {
  const [context] = useState({
    [STORAGE_KEY.MODE]: MODE.LIGHT, // system themes
    [STORAGE_KEY.SHOW_BACK_TOP]: true,
    [STORAGE_KEY.SHOW_DOCK_ICON]: true,
    [STORAGE_KEY.ENABLE_AUTO_UPDATE]: true,
    ...getContextFromStorage(),
    [STORAGE_KEY.TRENDING_TYPE]: REPOSITORIES,
  })

  return (
    <AppProvider value={context}>
      <Layout className={styles.layout}>
        <UpperContainer>
          <Index />
        </UpperContainer>

        <Footer id="footer">
          <Divider />
          <div className={styles.copyright}>
            <Text strong>
              © {new Date().getFullYear()} {pkg.productName}. All rights reserved.
            </Text>
          </div>
        </Footer>

        <UpdateNotification />
      </Layout>
    </AppProvider>
  )
}

export default App
