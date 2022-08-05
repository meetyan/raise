import React, {useEffect, useState} from 'react'
import {Typography, BackTop, Toast, Empty} from '@douyinfe/semi-ui'
import {IconArrowUp} from '@douyinfe/semi-icons'
import {IllustrationNoResult, IllustrationNoResultDark} from '@douyinfe/semi-illustrations'

import {RaiseHeader, RepositoryContent, DeveloperContent} from '@/components'
import {fetchRepositories, fetchDevelopers} from '@/io'
import {convert} from '@/utils'
import {TRENDING_TYPE} from '@/config'
import {useBackTop, useTrendingType} from '@/hooks'

import styles from './styles.scss'

const {Text} = Typography

const {REPOSITORIES} = TRENDING_TYPE

const Index = () => {
  const [trendingType] = useTrendingType()
  const [backTop] = useBackTop()

  const [list, setList] = useState([])
  const [getListParams, setGetListParams] = useState({})
  const [loading, setLoading] = useState(false)
  const [empty, setEmpty] = useState(false)

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

      <Content list={list} getList={getList} loading={loading} />

      {empty ? (
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
      ) : null}

      {backTop ? (
        <BackTop className={styles.backTop}>
          <IconArrowUp />
        </BackTop>
      ) : null}
    </>
  )
}

export default Index
