import {useScroll} from 'ahooks'

const useScrollPosition = () => {
  const scrollRef = useScroll()
  const scrollPosition = scrollRef?.top

  return scrollPosition
}

export default useScrollPosition
