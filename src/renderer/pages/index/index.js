import React, {useEffect, useState} from 'react'
import {Typography, BackTop, Toast, Empty} from '@douyinfe/semi-ui'
import {IconArrowUp} from '@douyinfe/semi-icons'
import {IllustrationNoResult, IllustrationNoResultDark} from '@douyinfe/semi-illustrations'
import axios from 'axios'

import {RaiseHeader, RepositoryContent, DeveloperContent} from '@/components'
import {fetchRepositories, fetchDevelopers, lastTimestamp} from '@/io'
import {convert} from '@/utils'
import {ALLOWED_TIME_OF_INACTIVITY, TRENDING_TYPE} from '@/config'
import {useBackTop, useDockIcon, useMode, useTrendingType} from '@/hooks'
import {IPC_FUNCTION} from '@shared'

import styles from './styles.scss'

const {Text} = Typography

const {REPOSITORIES} = TRENDING_TYPE
const {RELOAD_AFTER_INACTIVITY} = IPC_FUNCTION

const Index = () => {
  const [trendingType] = useTrendingType()
  const [backTop] = useBackTop()
  const [mode, setMode] = useMode()
  const [dockIcon, setDockIcon] = useDockIcon()

  const [list, setList] = useState([])
  const [getListParams, setGetListParams] = useState({})
  const [loading, setLoading] = useState(false)
  const [empty, setEmpty] = useState(false)

  const isRepo = trendingType === REPOSITORIES

  const Content = isRepo ? RepositoryContent : DeveloperContent

  const resetList = () => {
    setList([])
  }

  const getList = async params => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    setLoading(true)
    resetList()
    setGetListParams(params)
    setEmpty(false)

    let isCancel = false

    try {
      const fetch = isRepo ? fetchRepositories : fetchDevelopers
      const res = await fetch(convert(params))
      setList(res)
      setEmpty(!res.length)
    } catch (error) {
      if (axios.isCancel(error)) return (isCancel = true)

      console.log('An error occurred when calling getList. Params: ', params, error)
      Toast.error(
        'Oops. It looks like an error occurs. The server might be down. Please try again.'
      )
    } finally {
      setLoading(isCancel || false) // Makes sure that when a request is canceled, loading is true for next getList call
    }
  }

  const refresh = () => {
    getList(getListParams)
  }

  useEffect(() => {
    getList()
  }, [trendingType])

  /**
   * Recover settings to last state according to context storage
   * For example, when a user toggles settings in the settings modal,
   * a few changes have been made.
   * After he closes the app and reopens it,
   * all settings/context will have to be recovered.
   */
  useEffect(() => {
    setMode(mode)
    setDockIcon(dockIcon)
  }, [])

  useEffect(() => {
    const {receive} = window.electron

    const removeReloadListener = receive(RELOAD_AFTER_INACTIVITY, () => {
      const now = new Date().getTime()

      if (lastTimestamp && now - lastTimestamp > ALLOWED_TIME_OF_INACTIVITY) {
        console.log('getListParams', getListParams)
        getList(getListParams)
      }
    })

    return () => {
      removeReloadListener()
    }
  }, [getListParams])

  return (
    <>
      <RaiseHeader refresh={refresh} getList={getList} resetList={resetList} />

      <Content list={list} getList={getList} loading={loading} />

      {empty ? (
        <Empty
          className={styles.empty}
          image={<IllustrationNoResult style={{width: 150, height: 150}} />}
          darkModeImage={<IllustrationNoResultDark style={{width: 150, height: 150}} />}
          description={
            <Text className={styles.emptyDescription}>
              {`It looks like we don’t have any trending ${
                isRepo ? 'repositories' : 'developers'
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
