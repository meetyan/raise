import React from 'react'
import {Skeleton} from '@douyinfe/semi-ui'

import styles from './styles.scss'

const SkeletonPlaceholder = ({loading}) => {
  return (
    <Skeleton
      className={styles.skeleton}
      placeholder={<Skeleton.Image />}
      loading={loading}
      active
    />
  )
}

export default SkeletonPlaceholder
