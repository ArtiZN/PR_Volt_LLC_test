import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { Filter, selectTodoFilters, setFilters } from "../../store/todoListSlice"
import { cn } from "../../helpers"
import FlexBox from "../Flexbox"
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'

import styles from './styles.module.scss'
import { shallowEqual } from "react-redux"
import SettingsModal from "../Modal/SettingsModal"
import { useState } from "react"

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

  const [isSettingsModalVisible, setSettingsModalVisible] = useState<boolean>(false)

  const mode = useAppSelector(selectTodoFilters, shallowEqual)
  const dispatch = useAppDispatch()

  const onClick = (action: Filter): void => {
    if (action === mode) {
      dispatch(setFilters('All'))  
    } else
      dispatch(setFilters(action))
  }

  const onShowSettingsModal = (): void => {
    setSettingsModalVisible(true)
  }

  return <>
    <FlexBox className={className}>
      <SettingsSuggestIcon className={styles.settings} onClick={onShowSettingsModal} />
      {actions.map((action) => 
        <FilterItem key={action} onClick={() => onClick(action)} name={action} isActive={mode === action }/>)}
    </FlexBox>
    <SettingsModal setModalVisible={setSettingsModalVisible} isModalVisible={isSettingsModalVisible} />
  </>
}

export default Filters