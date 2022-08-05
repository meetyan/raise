import {useContextProp} from '@/app-context'

const useDockIcon = () => {
  const [dockIcon, setDockIcon] = useContextProp('showDockIcon')

  const _setDockIcon = visible => {
    window.electron.showDockIcon(visible)
    setDockIcon(visible)
  }

  return [dockIcon, _setDockIcon]
}

export default useDockIcon
