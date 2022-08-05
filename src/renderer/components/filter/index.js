import React, {forwardRef, useImperativeHandle, useRef} from 'react'
import {Form} from '@douyinfe/semi-ui'

import {SINCE_ARRAY, SPOKEN_LANGUAGES, LANGUAGES, SINCE, TRENDING_TYPE, Z_INDEX} from '@/config'
import {truncate} from '@/utils'
import {useTrendingType} from '@/hooks'

import styles from './styles.scss'

const Filter = ({getList}, ref) => {
  const api = useRef()
  const [trendingType] = useTrendingType()

  const isRepo = trendingType === TRENDING_TYPE.REPOSITORIES

  useImperativeHandle(ref, () => ({
    reset() {
      api.current.reset()
    },
  }))

  return (
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
              zIndex={Z_INDEX.SELECT}
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
            zIndex={Z_INDEX.SELECT}
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
            zIndex={Z_INDEX.SELECT}
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
  )
}

export default forwardRef(Filter)
