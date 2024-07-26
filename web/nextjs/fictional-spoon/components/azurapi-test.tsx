"use client"

import React, { useCallback, useState } from "react"
import { AzurAPI } from "@azurapi/azurapi"
import { Ship } from "@azurapi/azurapi/build/types/ship"
import { LazyLog, ScrollFollow } from "@melloware/react-logviewer"
import axios from "axios"

import { Button } from "./ui/button"

const AzurApiTest = ({}) => {
  const [counter, setCounter] = useState(1)
  const [textLog, setTextLog] = useState("foobar!\n")

  const log = (s: string) => {
    setTextLog(textLog.concat(`${s}\n`))
  }

  const buttonHandler = useCallback(async () => {
    try {
      // console.log(await myaction())
      await axios
        .post("/api/foo", {})
        .then((res) => {
          console.log("got result!")
          console.log(res)
          const ship: Ship = res.data
          log(ship.names.en)
          console.log("i did it...")
        })
        .catch((err) => console.log(err))
      console.log("Button clicked")
    } catch (error) {
      console.log(error)
    }
  }, [textLog])

  return (
    <>
      <p>AzurApiTest</p>
      <Button onClick={buttonHandler}>Send text</Button>
      <ScrollFollow
        startFollowing={true}
        render={({ follow, onScroll }) => (
          <LazyLog
            follow={follow}
            onScroll={onScroll}
            text={textLog}
            enableSearch={false}
          />
        )}
      />
    </>
  )
}

export default AzurApiTest
