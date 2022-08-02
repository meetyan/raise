export const truncate = (str, maxLength = 18) => {
  return str.length > maxLength ? `${str.substring(0, 18)}...` : str
}
