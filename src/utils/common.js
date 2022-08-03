export const truncate = (str, maxLength = 18) => {
  return str.length > maxLength ? `${str.substring(0, 18)}...` : str
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
