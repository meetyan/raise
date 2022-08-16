import {useContextProp} from '@/app-context'

import {STORAGE_KEY} from '@shared'

export const useTrendingType = () => {
  return useContextProp(STORAGE_KEY.TRENDING_TYPE)
}

export const useBackTop = () => {
  return useContextProp(STORAGE_KEY.SHOW_BACK_TOP)
}

export const useAutoUpdate = () => {
  return useContextProp(STORAGE_KEY.ENABLE_AUTO_UPDATE)
}
