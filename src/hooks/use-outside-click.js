import {useEffect} from 'react'

/**
 * Executes a handler function on click outside of a specific div
 * See: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
 * @param {*} ref
 * @param {*} handler
 */
const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

export default useOutsideClick
