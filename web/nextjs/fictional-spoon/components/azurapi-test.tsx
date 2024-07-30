"use client"

import React, { useCallback, useState } from "react"
import { AzurAPI } from "@azurapi/azurapi"
import { Ship } from "@azurapi/azurapi/build/types/ship"
import { LazyLog, ScrollFollow } from "@melloware/react-logviewer"
import axios from "axios"

import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

const AzurApiTest = ({}) => {
  const [counter, setCounter] = useState(1)
  const [textLog, setTextLog] = useState("azurapi-test.tsx\n")
  const [shipList, setShipList] = useState([])

  const log = (s: string) => {
    setTextLog(textLog.concat(`${s}\n`))
  }

  const buttonHandler = useCallback(async () => {
    try {
      await axios
        .post("/api/foo", {})
        .then((res) => {
          // console.log(res)
          const ships: Ship[] = res.data.list
          console.log(ships)
          // log(ship.names.en)
          setShipList(ships)
          console.log("Axios: (success?)")
        })
        .catch((err) => console.log(err))
      console.log("buttonHandler: Button clicked")
    } catch (error) {
      console.log(error)
    }
  }, [textLog, shipList])

  return (
    <>
      <Card className="flex flex-col gap-5 bg-zinc-900 p-5 rounded-sm">
        <div className="flex gap-5 items-center">
          <Button onClick={buttonHandler}>Call API</Button>
          <p>AzurApiTest</p>
        </div>

        {/* <ScrollFollow
        startFollowing={true}
        render={({ follow, onScroll }) => (
          <LazyLog
            follow={follow}
            onScroll={onScroll}
            text={textLog}
            enableSearch={false}
          />
        )}
      /> */}
        <div className="flex gap-5">
          {shipList.map((ship: Ship) => {
            return (
              <Card key={ship.id} className="w-40">
                <CardContent className="relative p-0">
                  <img src={ship.thumbnail} alt="Default" className="" />
                  <div className="absolute bottom-3 left-0 w-full bg-zinc-950">
                    <p className="text-center">{ship.names.en}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Card>
    </>
  )
}

export default AzurApiTest
