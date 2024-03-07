import InputIcon from '@mui/icons-material/Input'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import FlexBox from "../Flexbox"

import styles from './styles.module.scss'
import { useAppSelector } from '../../store/hooks'
import { Acc, selectCounts } from '../../store/todoListSlice'
import { shallowEqual } from 'react-redux'

const Icon = ({ name }: { name: string }): JSX.Element => {
  switch (name){
    case 'Current': return <NotInterestedIcon />
    case 'Complete': return <DoneAllIcon />
    default: return <InputIcon />
  }
}

const Footer = (): JSX.Element => {

  const counts: Acc = useAppSelector(selectCounts, shallowEqual)

  const entries: [string, number][] = Object.entries(counts)

  return <div className={styles.row}>
    {entries.map(([key, value]) => 
      <FlexBox key={key} className={styles.counterItem}>
        <Icon name={key} />{value}
      </FlexBox>
    )}
  </div>
}

export default Footer