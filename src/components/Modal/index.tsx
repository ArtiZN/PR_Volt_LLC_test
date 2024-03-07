import styles from './styles.module.scss'

interface Props {
  children: JSX.Element | JSX.Element []
  onHide: () => void
}

const Modal = ({children, onHide}: Props): JSX.Element => {
  return <>
    <div className={styles.modal}>{children}</div>
    <div className={styles.backdrop} onClick={onHide}/>
  </>
}

export default Modal