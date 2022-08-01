import React from 'react'
import {Layout, Typography} from '@douyinfe/semi-ui'
import {IconGithubLogo} from '@douyinfe/semi-icons'

import styles from './styles.scss'

const {Header} = Layout
const {Text} = Typography

const RaiseHeader = ({children}) => {
  return (
    <Header className={styles.header}>
      <div className={styles.top}>
        <h1 className={styles.heading}>
          <IconGithubLogo />
          <Text className={styles.headingTitle}>Trending</Text>
        </h1>

        {children}
      </div>
    </Header>
  )
}

export default RaiseHeader
