import React, {useLayoutEffect, useState} from 'react'

const UpperContainer = ({children}) => {
  const [footerHeight, setFooterHeight] = useState(0)

  useLayoutEffect(() => {
    const footerComponent = document.getElementById('footer')
    setFooterHeight(footerComponent.offsetHeight)
  }, [])

  return <div style={{minHeight: `calc(100vh - ${footerHeight}px - 40px)`}}>{children}</div>
}

export default UpperContainer
