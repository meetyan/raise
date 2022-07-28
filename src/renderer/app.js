import React from 'react'
import {
  Button,
  Layout,
  Form,
  Divider,
  Card,
  Typography,
  Space,
  BackTop,
  Progress,
} from '@douyinfe/semi-ui'
import {
  IconArrowUp,
  IconBranch,
  IconMoon,
  IconRefresh,
  IconSetting,
  IconSourceControl,
  IconStar,
} from '@douyinfe/semi-icons'

import {RaiseHeader} from '@/components'
import {switchMode} from './utils'
import sample from '@/sample'

import '@/assets/styles/reset.scss'
import '@/assets/styles/global.scss'

import styles from '@/app.scss'
import {DATE_RANGE} from './config'

const {Footer, Content} = Layout
const {Text} = Typography

const App = () => {
  return (
    <Layout className={`components-layout-demo ${styles.layout}`}>
      <RaiseHeader>
        <div className={styles.trendingType}>
          <Button type="primary" theme="solid" className={styles.trendingTypeButton}>
            Repositories
          </Button>
          <Button className={styles.trendingTypeButton}>Developers</Button>
        </div>
      </RaiseHeader>

      <div className={styles.settings}>
        <div className={styles.top}>
          <Button theme="borderless">
            <Space className={styles.left}>
              <IconRefresh />
              <Text>Refresh</Text>
            </Space>
          </Button>
          <Button theme="borderless" icon={<IconMoon />} onClick={switchMode} />
          <Button theme="borderless" icon={<IconSetting />} />
        </div>

        <Progress percent={50} aria-label="disk usage" style={{opacity: 1}} />

        <Divider />
      </div>

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
              <Form.Select.Option value="english">English</Form.Select.Option>
              <Form.Select.Option value="chinese">Chinese</Form.Select.Option>
              {Array.from({length: 20}, (_, idx) => `${++idx}`).map(item => {
                return (
                  <Form.Select.Option key={item} value={item}>
                    {item}
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

      <Footer>
        <Divider />
        <div className={styles.copyright}>
          <Text>Raise © {new Date().getFullYear()} All rights reserved.</Text>
          <Button theme="borderless">About</Button>
        </div>
      </Footer>

      <BackTop className={styles.backTop}>
        <IconArrowUp />
      </BackTop>
    </Layout>
  )
}

export default App
