import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { Filter, selectTodoFilters, setFilters } from "../../store/todoListSlice"
import { cn } from "../../helpers"
import FlexBox from "../Flexbox"

import styles from './styles.module.scss'

const actions: Filter[] = ['All', 'Current', 'Complete']

interface FilterItem {
  onClick: () => void
  isActive: boolean
  name: string
}
const FilterItem = ({onClick, isActive, name}: FilterItem): JSX.Element => {
  return <div 
    className={cn(styles['actions__item'], isActive && styles['actions__item--active'])} 
    onClick={onClick}
  >
    {name}
  </div>
}


interface Props {
  className: string
}
const Filters = ({className}: Props): JSX.Element => {

  const mode = useAppSelector(selectTodoFilters)
  const dispatch = useAppDispatch()

  const onClick = (action: Filter): void => {
    if (action === mode) {
      dispatch(setFilters('All'))  
    } else
      dispatch(setFilters(action))
  }
  return <FlexBox className={className}>
    {actions.map((action) => 
      <FilterItem key={action} onClick={() => onClick(action)} name={action} isActive={mode === action }/>)}
  </FlexBox>
}

export default Filters