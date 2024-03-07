import styles from '../../app/page.module.scss'
import { useDrop } from 'react-dnd'
import TodoList from '.'
import { cn } from '@/helpers'

interface Props {
  importance: boolean | undefined
  onMove?: (id: string, importance: boolean | undefined) => void
}

const TodoListWrapper = ({importance, onMove}: Props): JSX.Element => {

  const [, dropRef] = useDrop({
    accept: 'STATUS',
    
    drop: (item: {id: string}) => {
      onMove && onMove(item.id, importance)
    }
  })
    
  return <div className={cn(typeof importance === 'boolean' && styles.borderContainer)} ref={dropRef}>
    {typeof importance === 'boolean' && <div className={styles.borderContainerTitle}>{importance ? 'Important' : 'Not Important'}</div>}
    <TodoList importance={importance} showAll={typeof onMove === 'undefined'}/>
  </div>
}

export default TodoListWrapper