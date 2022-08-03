import React from 'react'
import {IconRefresh} from '@douyinfe/semi-icons'

import styles from './styles.scss'

const RefreshButton = ({onClick}) => {
  return (
    <div className={styles.refreshButton} onClick={onClick}>
      <IconRefresh />
    </div>
  )
}

export default RefreshButton
