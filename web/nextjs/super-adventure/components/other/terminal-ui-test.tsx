"use client"

import React, { useState } from "react"
import Terminal, { TerminalOutput } from "react-terminal-ui"

import { Button } from "../ui/button"

const TerminalUiTest = () => {
  const [log, setLog] = useState([
    <TerminalOutput>Welcome to react terminal ui demo</TerminalOutput>,
  ])
  const [counter, setCounter] = useState(31)

  const buttonHandler = () => {
    const item = <p>{counter}</p>
    setLog([item, ...log])
    setCounter(counter + 1)
  }

  return (
    <>
      <div>ClientComponentFoo</div>
      <Button onClick={buttonHandler}>Send text</Button>
      <Terminal>
        {log}
        {/* {[...Array(30).keys()].map((i) => {
          return <p>i{i}</p>
        })} */}
      </Terminal>
    </>
  )
}

export default TerminalUiTest
