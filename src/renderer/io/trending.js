import {sample, sampleSize, snakeCase} from 'lodash'

import axios from './interceptor'
import {URL} from '@/config'

let controller

function buildUrl(baseUrl, params = {}) {
  const queryString = Object.keys(params)
    .filter(key => params[key])
    .map(key => `${snakeCase(key)}=${params[key]}`)
    .join('&')

  return queryString === '' ? baseUrl : `${baseUrl}?${queryString}`
}

function checkResponse(res) {
  if (res.status !== 200) {
    throw new Error('Something went wrong')
  }
}

export async function fetchRepositories(params, serverUrl = URL.SERVER) {
  if (controller) {
    controller.abort() // Makes sure that users always get the latest result
  }

  controller = new AbortController()

  const res = await axios({
    method: 'get',
    url: buildUrl(`${serverUrl}/repositories`, params),
    signal: controller.signal,
  })

  checkResponse(res)

  return res.data
}

export async function fetchDevelopers(params, serverUrl = URL.SERVER) {
  if (controller) {
    controller.abort() // Makes sure that users always get the latest result
  }

  controller = new AbortController()
  const res = await axios({
    method: 'get',
    url: buildUrl(`${serverUrl}/developers`, params),
    signal: controller.signal,
  })

  checkResponse(res)

  return res.data
}

export async function fetchRandomRepository(params, serverUrl = URL.SERVER) {
  const res = await axios(buildUrl(`${serverUrl}/repositories`, params))
  checkResponse(res)

  const json = res.data
  return sample(json)
}

export async function fetchRandomRepositories(size = 1, params, serverUrl = URL.SERVER) {
  const res = await axios(buildUrl(`${serverUrl}/repositories`, params))
  checkResponse(res)

  const json = res.data
  return sampleSize(json, size)
}
