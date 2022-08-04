import React, {useState, useContext, useEffect} from 'react'

export const AppContext = React.createContext({})

export const AppProvider = ({value, children}) => {
  const [context, setContext] = useState(value)
  useEffect(() => {
    setContext(value)
  }, [value])
  return <AppContext.Provider value={[context, setContext]}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext)
}

export function useContextProp(propName) {
  const [context, setContext] = useAppContext()
  const [prop, _setProp] = useState(context[propName])

  useEffect(() => {
    _setProp(context[propName])
  }, [context, propName])

  const setProp = val => {
    _setProp(val)
    setContext(preCtx => {
      const data = {
        ...preCtx,
        [propName]: val,
      }
      return data
    })
  }

  return [prop, setProp]
}
