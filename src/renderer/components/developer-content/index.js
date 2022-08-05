import React from 'react'
import {Typography, Layout, Card, Space} from '@douyinfe/semi-ui'
import {IconBranch, IconCrown} from '@douyinfe/semi-icons'

import {SkeletonPlaceholder} from '@/components'

import styles from './styles.scss'

const {Content} = Layout
const {Text, Title} = Typography

const {open} = window.electron

const AuthorHeader = ({item}) => (
  <div className={styles.header}>
    <img className={styles.avatar} src={item.avatar} onClick={() => open(item.url)} />
    <Space vertical align="start" spacing={2}>
      <Title link heading={6} onClick={() => open(item.url)}>
        {item.name}
      </Title>
      <Text className={styles.cursor} onClick={() => open(item.url)}>
        {item.username}
      </Text>
    </Space>
  </div>
)

const DeveloperContent = ({list, loading}) => {
  return (
    <Content className={styles.content}>
      {Array.from({length: 5}).map((_, index) => (
        <SkeletonPlaceholder key={index} loading={loading} />
      ))}

      {list.map(item => {
        if (!item.repo) {
          return (
            <Card className={styles.developer} key={item.name}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <AuthorHeader item={item} />
              </div>
            </Card>
          )
        }

        return (
          <Card key={item.name} title={<AuthorHeader item={item} />} className={styles.developer}>
            <Space vertical align="start">
              <Space>
                <IconCrown /> <Text>Popular Repo</Text>
              </Space>
              <Space>
                <IconBranch />{' '}
                <Text link strong onClick={() => open(item.repo.url)}>
                  {item.repo.name}
                </Text>
              </Space>

              {item.repo.description ? (
                <Text className={styles.description}>{item.repo.description}</Text>
              ) : null}
            </Space>
          </Card>
        )
      })}
    </Content>
  )
}

export default DeveloperContent
