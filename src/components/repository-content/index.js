import React from 'react'
import {Divider, Form, Typography, Layout, Card, Space} from '@douyinfe/semi-ui'
import {IconBranch, IconSourceControl, IconStar} from '@douyinfe/semi-icons'

import {DATE_RANGE, SPOKEN_LANGUAGES, LANGUAGES} from '../../../app-config'

import styles from './styles.scss'
import sample from '@/sample'

const {Content} = Layout
const {Text} = Typography

const RepositoryContent = () => {
  return (
    <>
      <div className={styles.filter}>
        <div className={styles.bottom}>
          <Form labelPosition="left" labelAlign="left" labelWidth={180}>
            <Form.Select
              field="spokenLanguage"
              initValue="english"
              label="Spoken language"
              className={styles.bottomSelect}
              filter
            >
              {SPOKEN_LANGUAGES.map(item => {
                return (
                  <Form.Select.Option key={item.urlParam} value={item.urlParam}>
                    {item.name}
                  </Form.Select.Option>
                )
              })}
            </Form.Select>

            <Form.Select
              field="language"
              initValue="javascript"
              label="Language"
              className={styles.bottomSelect}
              filter
            >
              {LANGUAGES.map(item => {
                return (
                  <Form.Select.Option key={item.urlParam} value={item.urlParam}>
                    {item.name}
                  </Form.Select.Option>
                )
              })}
            </Form.Select>

            <Form.Select
              field="dateRange"
              initValue="today"
              label="Date range"
              className={styles.bottomSelect}
              filter
            >
              {DATE_RANGE.map(dateRange => {
                const value = dateRange.toLocaleLowerCase().split(' ').join('-')

                return (
                  <Form.Select.Option key={value} value={value}>
                    {dateRange}
                  </Form.Select.Option>
                )
              })}
            </Form.Select>
          </Form>
        </div>

        <Divider />
      </div>

      <Content className={styles.content}>
        {sample.map(item => {
          return (
            <Card
              key={item.repo}
              title={
                <div className={styles.repoHeader}>
                  <IconBranch />
                  <div className={styles.repoAuthor}>
                    <Text>{item.author}</Text> / <Text strong>{item.repo}</Text>
                  </div>
                </div>
              }
              className={styles.repo}
              headerExtraContent={<Text type="secondary">{item.language}</Text>}
            >
              <Text className={styles.description}>{item.description}</Text>

              <div className={styles.bottomArea}>
                <div className={styles.top}>
                  <Space>
                    <Space>
                      <IconStar /> <Text>{item.stars}</Text>
                    </Space>
                    <Space />
                    <Space>
                      <IconSourceControl /> <Text>{item.forked}</Text>
                    </Space>
                  </Space>

                  <Space>
                    <IconStar /> <Text>{item.starsToday} stars today</Text>
                  </Space>
                </div>

                <div className={styles.bottom}>
                  <Space>
                    <Text>Built by</Text>
                    <div>
                      {item.builtBy.map(builtByAuthor => {
                        return (
                          <img
                            className={styles.avatar}
                            src={builtByAuthor.avatar}
                            key={builtByAuthor.avatar}
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
