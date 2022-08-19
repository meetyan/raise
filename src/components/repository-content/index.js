import React from 'react'
import {Typography, Layout, Card, Space, Tooltip} from '@douyinfe/semi-ui'
import {IconBranch, IconSourceControl, IconStar} from '@douyinfe/semi-icons'

import {URL} from '@/config'
import {numberWithCommas, polyfill} from '@/utils'
import {SkeletonPlaceholder} from '@/components'

import styles from './styles.scss'

const {Content} = Layout
const {Text} = Typography
const {open} = polyfill

const RepositoryContent = ({list, loading}) => {
  return (
    <Content className={styles.content}>
      {Array.from({length: 5}).map((_, index) => (
        <SkeletonPlaceholder key={index} loading={loading} />
      ))}

      {list.map(item => {
        return (
          <Card
            key={item.name + item.author}
            title={
              <div className={styles.repoHeader}>
                <IconBranch />
                <div className={styles.repoAuthor}>
                  <Text link onClick={() => open(`${URL.GITHUB}/${item.author}`)}>
                    {item.author}
                  </Text>
                  {' / '}
                  <Tooltip content={item.name} position="bottom">
                    <Text link strong onClick={() => open(item.url)}>
                      {item.name}
                    </Text>
                  </Tooltip>
                </div>
              </div>
            }
            className={styles.repo}
            headerExtraContent={
              <Space spacing={4}>
                <span className={styles.languageColor} style={{background: item.languageColor}} />
                <Text type="secondary">{item.language || 'Unknown'}</Text>
              </Space>
            }
          >
            {item.description ? (
              <Text className={styles.description}>{item.description}</Text>
            ) : null}

            <div className={styles.bottomArea}>
              <div className={styles.top}>
                <Space>
                  <Space className={styles.cursor} spacing={4}>
                    <IconStar />
                    <Text onClick={() => open(`${item.url}/stargazers`)}>
                      {numberWithCommas(item.stars)}
                    </Text>
                  </Space>
                  <Space />
                  <Space className={styles.cursor} spacing={4}>
                    <IconSourceControl />
                    <Text onClick={() => open(`${item.url}/network/members.${item.author}`)}>
                      {numberWithCommas(item.forks)}
                    </Text>
                  </Space>
                </Space>

                <Space spacing={4}>
                  <IconStar />
                  <Text>{numberWithCommas(item.currentPeriodStars)} stars today</Text>
                </Space>
              </div>

              {item.builtBy?.length ? (
                <div className={styles.bottom}>
                  <Space>
                    <Text>Built by</Text>
                    <div>
                      {item.builtBy?.map(builtByAuthor => {
                        return (
                          <img
                            className={styles.avatar}
                            src={builtByAuthor.avatar}
                            key={builtByAuthor.avatar}
                            onClick={() => open(builtByAuthor.href)}
                          />
                        )
                      })}
                    </div>
                  </Space>
                </div>
              ) : null}
            </div>
          </Card>
        )
      })}
    </Content>
  )
}

export default RepositoryContent
