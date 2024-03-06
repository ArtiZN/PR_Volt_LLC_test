import { Filter, TodoItem } from "../store/todoListSlice"
import { useEffect, useState } from "react"

const LS_ITEMS_KEY = 'LS_TODO_ITEMS'
const LS_FILTERS_KEY = 'LS_TODO_FILTERS'

interface Return {
  items: TodoItem[]
  filter: Filter
}

const useInitialLoad = (): Return => {

  const [items, setItems]  = useState<TodoItem[]>([])
  const [filter, setFilter] = useState<Filter>('All')

  useEffect(() => {
    const items = localStorage.getItem(LS_ITEMS_KEY)
    const filter = localStorage.getItem(LS_FILTERS_KEY)
    if (items) {
      const value = JSON.parse(items)
      setItems(value)
    }
    if (filter) {
      const value = JSON.parse(filter)
      setFilter(value)
    }
  },[])

  return { items, filter}
}

export default useInitialLoad