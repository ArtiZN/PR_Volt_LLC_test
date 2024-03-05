import { CSSProperties } from "react"

interface Props {
  children?: JSX.Element[] | JSX.Element | React.ReactNode
  styles?: CSSProperties
}

const FlexBox = (props: Props): JSX.Element => {
  const { styles, children } = props
  return <div style={{ display: 'flex', ...styles }}>{children}</div>
}

export default FlexBox