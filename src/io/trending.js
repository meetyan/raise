import {snakeCase} from 'lodash'

import axios from './interceptor'
import {TRENDING_TYPE, URL} from '@/config'
import {getTimeStamp} from '@/utils'

let controller
export let lastTimestamp = 0

const buildUrl = (baseUrl, params = {}) => {
  const queryString = Object.keys(params)
    .filter(key => params[key])
    .map(key => `${snakeCase(key)}=${params[key]}`)
    .join('&')

  return queryString === '' ? baseUrl : `${baseUrl}?${queryString}`
}

const checkResponse = res => {
  if (res.status !== 200) {
    throw new Error('Something went wrong')
  }
}

const fetch = async ({params = {}, type, serverUrl = URL.SERVER} = {}) => {
  if (controller) {
    controller.abort() // Makes sure that users always get the latest result
  }

  controller = new AbortController()

  /**
   * Used to compare between now and inactivity.
   * Reloads if time of inactivity is too long
   */
  lastTimestamp = getTimeStamp()

  const res = await axios({
    method: 'get',
    url: buildUrl(`${serverUrl}/${type}`, params),
    signal: controller.signal,
  })

  checkResponse(res)

  return res.data
}

export const fetchRepositories = (params, serverUrl = URL.SERVER) => {
  return fetch({params, serverUrl, type: TRENDING_TYPE.REPOSITORIES.toLocaleLowerCase()})
}

export const fetchDevelopers = async (params, serverUrl = URL.SERVER) => {
  return fetch({params, serverUrl, type: TRENDING_TYPE.DEVELOPERS.toLocaleLowerCase()})
}
