import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react'
import {Divider, Form} from '@douyinfe/semi-ui'

import {SINCE_ARRAY, SPOKEN_LANGUAGES, LANGUAGES, SINCE, TRENDING_TYPE} from '@/config'
import {truncate} from '@/utils'

import styles from './styles.scss'

const Filter = ({trendingType, getList}, ref) => {
  const api = useRef()
  const [isRepo, setIsRepo] = useState(true)

  useImperativeHandle(ref, () => ({
    reset() {
      api.current.reset()
    },
  }))

  useEffect(() => {
    setIsRepo(trendingType === TRENDING_TYPE.REPOSITORIES)
  }, [trendingType])

  return (
    <>
      <Divider />
      <div className={styles.filter}>
        <div className={styles.bottom}>
          <Form
            labelPosition="left"
            labelAlign="left"
            labelWidth={180}
            onValueChange={getList}
            getFormApi={formApi => (api.current = formApi)}
          >
            {isRepo ? (
              <Form.Select
                field="spoken_language_code"
                initValue="any"
                label="Spoken language"
                className={styles.bottomSelect}
                filter
                zIndex={9999}
                style={{width: '100%'}}
              >
                {SPOKEN_LANGUAGES.map(item => {
                  return (
                    <Form.Select.Option key={item.name} value={item.urlParam}>
                      {truncate(item.name)}
                    </Form.Select.Option>
                  )
                })}
              </Form.Select>
            ) : null}

            <Form.Select
              field="language"
              initValue="any"
              label="Language"
              className={styles.bottomSelect}
              filter
              zIndex={9999}
              style={{width: '100%'}}
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
              zIndex={9999}
              style={{width: '100%'}}
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
      </div>
    </>
  )
}

export default forwardRef(Filter)
