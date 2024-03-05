"use client"
import { useState } from "react"

const Input = (): JSX.Element => {
  const [value, setValue] = useState('')
  return <input value={value} onChange={(e) => setValue(e.target.value)}></input>
}

export default Input