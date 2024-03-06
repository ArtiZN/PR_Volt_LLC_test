import Filters from './Filters'
import { cn } from '../../helpers'
import styles from './styles.module.scss'

const Header = (): JSX.Element => {
  return <div className={styles.container}>
    <div className={styles.headerItem}/>
    <div className={cn(styles.headerItem, styles.title)}>Todo List</div>
    <Filters className={cn(styles.headerItem, styles.actions)} />
  </div>
}

export default Header