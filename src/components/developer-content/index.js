import React from 'react'
import {Divider, Form, Typography, Layout, Card, Space} from '@douyinfe/semi-ui'
import {IconBranch, IconCrown} from '@douyinfe/semi-icons'

import {SINCE_ARRAY, LANGUAGES, SINCE} from '@/config'
import {truncate} from '@/utils'

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

const DeveloperContent = ({list, getList}) => {
  return (
    <>
      <div className={styles.filter}>
        <div className={styles.bottom}>
          <Form
            labelPosition="left"
            labelAlign="left"
            labelWidth={140}
            onValueChange={e => getList(e)}
          >
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
    </>
  )
}

export default DeveloperContent
