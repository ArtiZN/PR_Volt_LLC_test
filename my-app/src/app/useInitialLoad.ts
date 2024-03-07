import { Filter, LS_FILTERS_KEY, LS_ITEMS_KEY, LS_LENGTH_KEY, TodoItem } from "../store/todoListSlice"
import { useEffect, useState } from "react"

interface Return {
  items: TodoItem[]
  filter: Filter
  maxLength: number
  isLoaded: boolean
}

const useInitialLoad = (): Return => {

  const [items, setItems]  = useState<TodoItem[]>([])
  const [filter, setFilter] = useState<Filter>('All')
  const [maxLength, setMaxLength] = useState<number>(25)
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    const items = localStorage.getItem(LS_ITEMS_KEY)
    const filter = localStorage.getItem(LS_FILTERS_KEY)
    const maxLength = localStorage.getItem(LS_LENGTH_KEY)
    console.log(items, filter, maxLength)
    if (items) {
      const value = JSON.parse(items)
      setItems(value)
    }
    if (filter) {
      const value = JSON.parse(filter)
      setFilter(value)
    }
    if (maxLength) {
      const value = JSON.parse(maxLength)
      setMaxLength(value)
    }
    setLoaded(true)
  },[])

  return { items, filter, maxLength, isLoaded }
}

export default useInitialLoad