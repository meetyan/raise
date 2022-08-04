import {useContextProp} from '@/app-context'

export const useTrendingType = () => {
  return useContextProp('trendingType')
}
