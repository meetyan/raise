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
  IconGithubLogo,
  IconMoon,
  IconRefresh,
  IconSetting,
  IconSourceControl,
  IconStar,
} from '@douyinfe/semi-icons'
import sample from '@/sample'

import '@/assets/styles/reset.scss'
import '@/assets/styles/global.scss'

import styles from '@/app.scss'
import RaiseHeader from './components/raise-header'

const App = () => {
  const {Footer, Content} = Layout

  const switchMode = () => {
    const body = document.body
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode')
    } else {
      body.setAttribute('theme-mode', 'dark')
    }
  }

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
              <Typography.Text>Refresh</Typography.Text>
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
              <Form.Select.Option value="today">Today</Form.Select.Option>
              <Form.Select.Option value="this-week">This week</Form.Select.Option>
              <Form.Select.Option value="this-month">This month</Form.Select.Option>
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
                    <Typography.Text>{item.author}</Typography.Text> /{' '}
                    <Typography.Text strong>{item.repo}</Typography.Text>
                  </div>
                </div>
              }
              className={styles.repo}
              headerExtraContent={
                <Typography.Text type="secondary">{item.language}</Typography.Text>
              }
            >
              <Typography.Text className={styles.description}>{item.description}</Typography.Text>

              <div className={styles.bottomArea}>
                <div className={styles.top}>
                  <Space>
                    <Space>
                      <IconStar /> <Typography.Text>{item.stars}</Typography.Text>
                    </Space>
                    <Space />
                    <Space>
                      <IconSourceControl /> <Typography.Text>{item.forked}</Typography.Text>
                    </Space>
                  </Space>

                  <Space>
                    <IconStar /> <Typography.Text>{item.starsToday} stars today</Typography.Text>
                  </Space>
                </div>

                <div className={styles.bottom}>
                  <Space>
                    <Typography.Text>Built by</Typography.Text>
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
          <Typography.Text>Raise © {new Date().getFullYear()} All rights reserved.</Typography.Text>
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
