import React from 'react'
import {Divider, Modal, Typography} from '@douyinfe/semi-ui'

import {VERSION} from '@/config'
import Logo from '@/assets/images/logo.png'

import styles from './styles.scss'

const {Text, Title} = Typography
const {open} = window.electron

const AboutModal = ({visible, setVisible}) => {
  return (
    <Modal
      title="About"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      closeOnEsc={true}
      width={350}
      height={400}
      centered
      footer={null}
      zIndex={99999}
    >
      <Divider />
      <div className={styles.aboutModal}>
        <div className={styles.logo}>
          <img src={Logo} alt="logo" />
          <Title className={styles.title} heading={5}>
            Raise
          </Title>
        </div>
        <Text className={`${styles.centerAligned} ${styles.version}`}>Version {VERSION}</Text>
        <Text className={styles.centerAligned}>
          A simple (and unofficial) GitHub Trending client that lives in your menubar.
        </Text>
        <div className={styles.copyright}>
          <Text
            link
            className={styles.centerAligned}
            onClick={() => open('https://github.com/realfrancisyan/raise')}
          >
            An open-source project by Jiajun Yan.
          </Text>
          <Text className={styles.centerAligned}>
            Copyright © {new Date().getFullYear()} Raise. All rights reserved.
          </Text>
        </div>
      </div>
    </Modal>
  )
}

export default AboutModal
