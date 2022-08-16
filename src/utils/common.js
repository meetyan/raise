export const truncate = (str, maxLength = 14) => {
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str
}

export const convert = params => {
  if (!params) return params

  return Object.entries(params)
    .map(([key, value]) => {
      value = value === 'any' ? '' : value
      return [key, value]
    })
    .reduce((final, item) => {
      const [key, value] = item
      final[key] = value
      return final
    }, {})
}

export const numberWithCommas = number => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const isMac = window.navigator?.userAgentData?.platform.toUpperCase().includes('MAC')

export const getTimeStamp = () => new Date().getTime()
