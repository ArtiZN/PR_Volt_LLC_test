import styles from './styles.module.scss'
import { cn } from '../../helpers'

interface Props {
  value: string
  setValue: (value: string)=> void
  onKeydown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  isError?: boolean
  maxLength?: number
}

const Input = ({ value, setValue, onKeydown, isError, maxLength }: Props): JSX.Element => {

  return <input 
    className={cn(styles.input, isError && styles.error)} 
    placeholder="Input your magic ToDo item" 
    value={value} 
    onChange={(e) => maxLength ? e.target.value.length <= maxLength  && setValue(e.target.value) : setValue(e.target.value)} 
    onKeyDown={(e) => onKeydown && onKeydown(e)} // to trigger some actions on key press
  ></input>
}

export default Input