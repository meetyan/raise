import {useContextProp} from '@/app-context'
import {polyfill} from '@/utils'
import {IPC_FUNCTION, STORAGE_KEY} from '@shared'

const useDockIcon = () => {
  const [dockIcon, setDockIcon] = useContextProp(STORAGE_KEY.SHOW_DOCK_ICON)

  const _setDockIcon = visible => {
    polyfill.send(IPC_FUNCTION.SHOW_DOCK_ICON, visible)

    setDockIcon(visible)
  }

  return [dockIcon, _setDockIcon]
}

export default useDockIcon
