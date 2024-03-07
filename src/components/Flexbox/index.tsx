import { CSSProperties } from "react"
import { cn } from "../../helpers"
import styles from './styles.module.scss'

interface Props {
  children?: JSX.Element[] | JSX.Element | React.ReactNode
  style?: CSSProperties
  onClick?: (args: unknown) => void 
  className?: string
}

const FlexBox = (props: Props): JSX.Element => {
  const { style, children, onClick, className } = props
  return <div onClick={onClick} style={style} className={cn(className, styles.flexbox)}>{children}</div>
}

export default FlexBox