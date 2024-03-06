import { CSSProperties } from "react"

interface Props {
  children?: JSX.Element[] | JSX.Element | React.ReactNode
  styles?: CSSProperties
  onClick?: (args: unknown) => void 
  className?: string
}

const FlexBox = (props: Props): JSX.Element => {
  const { styles, children, onClick, className } = props
  return <div onClick={onClick} style={{ display: 'flex', ...styles }} className={className}>{children}</div>
}

export default FlexBox