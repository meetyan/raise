import {useState} from 'react'

import {MODE} from '@/config'

const useMode = () => {
  const [mode, setMode] = useState(MODE.DARK)

  const _setMode = () => {
    const body = document.body
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode')
      setMode(MODE.LIGHT)
    } else {
      body.setAttribute('theme-mode', 'dark')
      setMode(MODE.DARK)
    }
  }

  return [mode, _setMode]
}

export default useMode
