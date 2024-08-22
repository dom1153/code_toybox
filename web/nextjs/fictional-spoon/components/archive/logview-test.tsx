"use client"

import React, { useState } from "react"
import { LazyLog, ScrollFollow } from "@melloware/react-logviewer"

import { Button } from "../ui/button"

const LogViewTest = () => {
  const [log, setLog] = useState(`hello, hey\nblah\n`)
  const [counter, setCounter] = useState(1)

  const buttonHandler = () => {
    const item = <p>{counter}</p>
    setLog(log.concat(`f, {counter}\n`))
    setCounter(counter + 1)
  }

  return (
    <>
      <div>ClientComponentFoo</div>
      <Button onClick={buttonHandler}>Send text</Button>
      <ScrollFollow
        startFollowing={true}
        render={({ follow, onScroll }) => (
          <LazyLog
            follow={follow}
            onScroll={onScroll}
            text={log}
            enableSearch={false}
          />
        )}
      />
    </>
  )
}

export default LogViewTest
