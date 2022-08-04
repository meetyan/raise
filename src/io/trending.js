import {sample, sampleSize, snakeCase} from 'lodash'

import axios from './interceptor'

const SERVER_URL = 'https://trending.curve.to'

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

export async function fetchRepositories(params, serverUrl = SERVER_URL) {
  console.log('object', `${serverUrl}/repositories`)
  const res = await axios(buildUrl(`${serverUrl}/repositories`, params))
  checkResponse(res)

  return res.data
}

export async function fetchDevelopers(params, serverUrl = SERVER_URL) {
  const res = await axios(buildUrl(`${serverUrl}/developers`, params))
  checkResponse(res)

  return res.data
}

export async function fetchRandomRepository(params, serverUrl = SERVER_URL) {
  const res = await axios(buildUrl(`${serverUrl}/repositories`, params))
  checkResponse(res)

  const json = res.data
  return sample(json)
}

export async function fetchRandomRepositories(size = 1, params, serverUrl = SERVER_URL) {
  const res = await axios(buildUrl(`${serverUrl}/repositories`, params))
  checkResponse(res)

  const json = res.data
  return sampleSize(json, size)
}
