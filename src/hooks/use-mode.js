import {useContextProp} from '@/app-context'
import {MODE} from '@/config'

const useMode = () => {
  const [mode, setMode] = useContextProp('mode')

  const _setMode = () => {
    const body = document.body
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode')
      console.log('hook settings mode, light')
      setMode(MODE.LIGHT)
    } else {
      body.setAttribute('theme-mode', 'dark')
      console.log('hook settings mode, dark')
      setMode(MODE.DARK)
    }
  }

  return [mode, _setMode]
}

export default useMode
