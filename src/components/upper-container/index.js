import React from 'react'

const UpperContainer = ({children, footerHeight = 0}) => {
  return <div style={{minHeight: `calc(100vh - ${footerHeight}px - 40px)`}}>{children}</div>
}

export default UpperContainer
