interface Props {
  value: string
  setValue: (value: string)=> void
}

const Input = ({value, setValue}: Props): JSX.Element => {
  return <input value={value} onChange={(e) => setValue(e.target.value)}></input>
}

export default Input