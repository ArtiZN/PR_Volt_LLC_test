import { useEffect, useState } from "react"
import Modal from ".."
import FlexBox from "../../Flexbox"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { selectMaxLength, setMaxLength } from "../../../store/todoListSlice"
import styles from './styles.module.scss'
import { shallowEqual } from "react-redux"

interface Props {
  isModalVisible: boolean
  setModalVisible: (val: boolean) => void
}
const SettingsModal = (props: Props): JSX.Element | null => {
  const { isModalVisible, setModalVisible } = props

  const dispatch = useAppDispatch()
  const maxValue = useAppSelector(selectMaxLength, shallowEqual)

  const [inputValue, setInputValue] = useState(maxValue)
  const [debouncedInputValue, setDebouncedInputValue] = useState(maxValue)

  const [skipRender, setSkipRender] = useState(true)

  useEffect(() => {
    setInputValue(maxValue)
  },[maxValue])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputNumber = +event.target.value
    if (inputNumber) {
      if (inputNumber <= 1)
        setInputValue(1)
      else if (inputNumber >= 100)
        setInputValue(100)
      else setInputValue(inputNumber)

    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [inputValue])

  useEffect(() => {
    if (!skipRender) {
      dispatch(setMaxLength(debouncedInputValue))
    } else setSkipRender(false)
  },[debouncedInputValue, dispatch, skipRender])


  const onHide = (): void => {
    setModalVisible(false)
  }

  if (!isModalVisible) return null

  return <Modal onHide={onHide}>
    <FlexBox className={styles.row}>
      <div>Longest avaliable record:</div>
      <input className={styles.input} type="number" inputMode="numeric" pattern="\d*" min={1} max={100} value={inputValue} onChange={onChange}></input>
    </FlexBox>
  </Modal>
}

export default SettingsModal