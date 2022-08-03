import React from 'react'
import {Divider, Form, Typography, Layout, Card, Space, Tooltip} from '@douyinfe/semi-ui'
import {IconBranch, IconSourceControl, IconStar} from '@douyinfe/semi-icons'

import {SINCE_ARRAY, SPOKEN_LANGUAGES, LANGUAGES, SINCE, GITHUB_URL} from '@/config'
import {truncate} from '@/utils'
import {SkeletonPlaceholder} from '@/components'

import styles from './styles.scss'

const {Content} = Layout
const {Text} = Typography

const {open} = window.electron

const RepositoryContent = ({list, getList, loading}) => {
  return (
    <>
      <div className={styles.filter}>
        <div className={styles.bottom}>
          <Form
            labelPosition="left"
            labelAlign="left"
            labelWidth={180}
            onValueChange={e => getList(e)}
          >
            <Form.Select
              field="spoken_language_code"
              initValue="any"
              label="Spoken language"
              className={styles.bottomSelect}
              filter
            >
              {SPOKEN_LANGUAGES.map(item => {
                return (
                  <Form.Select.Option key={item.name} value={item.urlParam}>
                    {truncate(item.name)}
                  </Form.Select.Option>
                )
              })}
            </Form.Select>

            <Form.Select
              field="language"
              initValue="any"
              label="Language"
              className={styles.bottomSelect}
              filter
            >
              {LANGUAGES.map(item => {
                return (
                  <Form.Select.Option key={item.name} value={item.urlParam}>
                    {truncate(item.name)}
                  </Form.Select.Option>
                )
              })}
            </Form.Select>

            <Form.Select
              field="since"
              initValue={SINCE.DAILY}
              label="Date range"
              className={styles.bottomSelect}
              filter
            >
              {SINCE_ARRAY.map(since => {
                return (
                  <Form.Select.Option key={since.value} value={since.value}>
                    {since.name}
                  </Form.Select.Option>
                )
              })}
            </Form.Select>
          </Form>
        </div>

        <Divider />
      </div>

      <Content className={styles.content}>
        {Array.from({length: 10}).map((_, index) => (
          <SkeletonPlaceholder key={index} loading={loading} />
        ))}

        {list.map(item => {
          return (
            <Card
              key={item.name}
              title={
                <div className={styles.repoHeader}>
                  <IconBranch />
                  <div className={styles.repoAuthor}>
                    <Text link onClick={() => open(`${GITHUB_URL}/${item.author}`)}>
                      {item.author}
                    </Text>
                    {' / '}
                    <Tooltip content={item.name} position="top">
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
                      <IconStar />{' '}
                      <Text onClick={() => open(`${item.url}/stargazers`)}>{item.stars}</Text>
                    </Space>
                    <Space />
                    <Space className={styles.cursor} spacing={4}>
                      <IconSourceControl />{' '}
                      <Text onClick={() => open(`${item.url}/network/members.${item.author}`)}>
                        {item.forks}
                      </Text>
                    </Space>
                  </Space>

                  <Space spacing={4}>
                    <IconStar /> <Text>{item.currentPeriodStars} stars today</Text>
                  </Space>
                </div>

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
              </div>
            </Card>
          )
        })}
      </Content>
    </>
  )
}

export default RepositoryContent
