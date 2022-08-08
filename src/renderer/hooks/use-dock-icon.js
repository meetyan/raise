import {useContextProp} from '@/app-context'
import {IPC_FUNCTION} from '@shared'

const useDockIcon = () => {
  const [dockIcon, setDockIcon] = useContextProp('showDockIcon')

  const _setDockIcon = visible => {
    const {send} = window.electron
    send(IPC_FUNCTION.SHOW_DOCK_ICON, visible)
    setDockIcon(visible)
  }

  return [dockIcon, _setDockIcon]
}

export default useDockIcon
