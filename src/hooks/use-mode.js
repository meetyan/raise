import {useContextProp} from '@/app-context'
import {MODE} from '@/config'

const useMode = () => {
  const [mode, setMode] = useContextProp('mode')

  const _setMode = target => {
    const body = document.body
    if (target === MODE.LIGHT) {
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
