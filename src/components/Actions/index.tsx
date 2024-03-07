import styles from './styles.module.scss'

interface Props {
  onCreate: () => void
}

const Actions = ({ onCreate }: Props): JSX.Element => 
  <div className={styles.add} onClick={onCreate}>
    +
  </div>


export default Actions