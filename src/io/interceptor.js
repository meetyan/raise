import axios from 'axios'
import NProgress from 'nprogress'

NProgress.configure({showSpinner: false})

axios.interceptors.request.use(
  config => {
    NProgress.start()
    return config
  },
  error => {
    NProgress.start()
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    NProgress.done()
    return response
  },
  error => {
    NProgress.done()
    return Promise.reject(error)
  }
)

export default axios
