import {useContextProp} from '@/app-context'
import {IPC_FUNCTION, STORAGE_KEY} from '@shared'

const useDockIcon = () => {
  const [dockIcon, setDockIcon] = useContextProp(STORAGE_KEY.SHOW_DOCK_ICON)

  const _setDockIcon = visible => {
    window.electron.send(IPC_FUNCTION.SHOW_DOCK_ICON, visible)
    setDockIcon(visible)
  }

  return [dockIcon, _setDockIcon]
}

export default useDockIcon
