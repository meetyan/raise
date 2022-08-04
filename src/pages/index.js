import React, {useEffect, useState} from 'react'
import {Layout, Divider, Typography, BackTop, Toast, Empty} from '@douyinfe/semi-ui'
import {IconArrowUp} from '@douyinfe/semi-icons'
import {IllustrationNoResult, IllustrationNoResultDark} from '@douyinfe/semi-illustrations'

import {RaiseHeader, RepositoryContent, DeveloperContent} from '@/components'
import {fetchRepositories, fetchDevelopers} from '@/io'
import {convert} from '@/utils'
import {TRENDING_TYPE} from '@/config'
import {useTrendingType} from '@/hooks'

import styles from './styles.scss'

const {Footer} = Layout
const {Text} = Typography

const {REPOSITORIES} = TRENDING_TYPE

const Index = () => {
  const [list, setList] = useState([])
  const [getListParams, setGetListParams] = useState({})
  const [loading, setLoading] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [trendingType] = useTrendingType()

  const Content = trendingType === REPOSITORIES ? RepositoryContent : DeveloperContent

  const getList = async params => {
    if (loading) return

    setLoading(true)
    setList([])
    setGetListParams(params)
    setEmpty(false)

    try {
      const fetch = trendingType === REPOSITORIES ? fetchRepositories : fetchDevelopers
      const res = await fetch(convert(params))
      setList(res)
      setEmpty(!res.length)
    } catch (error) {
      console.log('An error occurred when calling getList. Params: ', params, error)
      Toast.error(
        'Oops. It looks like an error occurs. The server might be down. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    getList(getListParams)
  }

  useEffect(() => {
    getList()
  }, [trendingType])

  return (
    <>
      <RaiseHeader refresh={refresh} getList={getList} />

      {empty ? (
        <>
          <Divider />
          <Empty
            className={styles.empty}
            image={<IllustrationNoResult style={{width: 150, height: 150}} />}
            darkModeImage={<IllustrationNoResultDark style={{width: 150, height: 150}} />}
            description={
              <Text className={styles.emptyDescription}>
                {`It looks like we don’t have any trending ${
                  trendingType === REPOSITORIES ? 'repositories' : 'developers'
                } for your choices.`}
              </Text>
            }
          />
        </>
      ) : (
        <div className={styles.content}>
          <Content list={list} getList={getList} loading={loading} />
        </div>
      )}

      <Footer>
        <Divider />
        <div className={styles.copyright}>
          <Text strong>© {new Date().getFullYear()} Raise. All rights reserved.</Text>
        </div>
      </Footer>

      <BackTop className={styles.backTop}>
        <IconArrowUp />
      </BackTop>
    </>
  )
}

export default Index