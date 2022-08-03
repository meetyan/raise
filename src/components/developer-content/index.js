import React from 'react'
import {Divider, Form, Typography, Layout, Card, Space, Button} from '@douyinfe/semi-ui'
import {IconBranch, IconCrown, IconGlobe} from '@douyinfe/semi-icons'

import {SINCE_ARRAY} from '@/config'

import styles from './styles.scss'
import sample from '@/developer-sample'

const {Content} = Layout
const {Text, Title} = Typography

const DeveloperContent = () => {
  return (
    <>
      <div className={styles.filter}>
        <div className={styles.bottom}>
          <Form labelPosition="left" labelAlign="left" labelWidth={140}>
            <Form.Select
              field="language"
              initValue="javascript"
              label="Language"
              className={styles.bottomSelect}
              filter
            >
              <Form.Select.Option value="javascript">Javascript</Form.Select.Option>
              <Form.Select.Option value="python">Python</Form.Select.Option>
            </Form.Select>

            <Form.Select
              field="dateRange"
              initValue="today"
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

            <Form.Select
              field="sponsorable"
              initValue="all"
              label="Sponsorable"
              className={styles.bottomSelect}
              filter
            >
              <Form.Select.Option value="all">All developers</Form.Select.Option>
              <Form.Select.Option value="sponsorable">Sponsorable developers</Form.Select.Option>
            </Form.Select>
          </Form>
        </div>

        <Divider />
      </div>

      <Content className={styles.content}>
        {sample.map(item => {
          return (
            <Card
              key={item.name}
              title={
                <div className={styles.header}>
                  <img className={styles.avatar} src={item.avatar} />
                  <Space vertical align="start" spacing={2}>
                    <Title heading={6}>{item.name}</Title>
                    <Text>{item.username}</Text>
                  </Space>
                </div>
              }
              className={styles.developer}
              headerExtraContent={<Button>Follow</Button>}
            >
              {item.isRepoPopular ? (
                <Space vertical align="start">
                  <Space>
                    <IconCrown /> <Text>Popular Repo</Text>
                  </Space>
                  <Space>
                    <IconBranch /> <Text strong>{item.repo}</Text>
                  </Space>

                  <Text className={styles.description}>{item.repoDescription}</Text>
                </Space>
              ) : (
                <Space>
                  <IconGlobe /> <Text>{item.organization}</Text>
                </Space>
              )}
            </Card>
          )
        })}
      </Content>
    </>
  )
}

export default DeveloperContent
