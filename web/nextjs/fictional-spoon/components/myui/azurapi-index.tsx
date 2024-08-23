"use client"

import { useCallback, useEffect, useState } from "react"
import { Ship } from "@azurapi/azurapi/build/types/ship"
import { Label } from "@radix-ui/react-label"
import axios from "axios"
import { Ban, RotateCw } from "lucide-react"
import toast from "react-hot-toast"

import { isDevEnv } from "@/lib/myutils"
import useFullShipList from "@/hooks/useShipList"

import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import DummyCard from "./index/dummy-card"
import ShipCard from "./index/shipcard"

interface ItemType {
  id: string
  label: string
  items: ItemTypeType[]
}

interface ItemTypeType {
  id: string
  label: string
}

let items: ItemType[] = [
  {
    id: "hull",
    label: "Hull",
    items: [
      {
        id: "main",
        label: "Main",
      },
      {
        id: "vanguard",
        label: "Vanguard",
      },
      {
        id: "dd",
        label: "DD",
      },
    ],
  },
]

let searchDelayTimeout: any = undefined
const searchDelay = isDevEnv ? 0 : 100

// @refresh reset
const AzurApiIndex = ({}) => {
  // is shiplist not stored between pages? is it possible to change that?
  const [shipList, setShipList] = useState([] as Ship[])
  const [searchText, setSearchText] = useState("")
  const [searchWaiting, setSearchWaiting] = useState(false)
  const { data: fullShipList } = useFullShipList()

  useEffect(() => {
    if (shipList.length <= 0 && fullShipList) {
      setShipList(fullShipList)
    }
  }, [fullShipList, shipList.length])

  // // TODO: focus input bar via ref
  // useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if ((e.key === "f" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
  //       if (
  //         (e.target instanceof HTMLElement && e.target.isContentEditable) ||
  //         e.target instanceof HTMLInputElement ||
  //         e.target instanceof HTMLTextAreaElement ||
  //         e.target instanceof HTMLSelectElement
  //       ) {
  //         return
  //       }

  //       e.preventDefault()
  //       // setOpen((open) => !open)
  //     }
  //   }

  //   document.addEventListener("keydown", down)
  //   return () => document.removeEventListener("keydown", down)
  // }, [])

  const azurApiHandler = useCallback(async () => {
    try {
      if (isDevEnv) toast("Refreshing API")
      await axios
        .get(`/api/azur/test`, {})
        .then((res) => {
          const ships: Ship[] = res.data.list
          if (isDevEnv) toast(`res size: ${ships.length}`)
          setShipList(ships)
        })
        .catch((err) => {
          console.log(err)
          if (isDevEnv) toast("API refresh: error!")
        })
    } catch (error) {
      if (isDevEnv) {
        console.error("Callback: error!")
        if (isDevEnv) toast("Callback: error!")
        console.log(error)
      }
    } finally {
      // console.info("Callback: success!")
    }
  }, [])

  const searchTextQuery = useCallback(async (txt: any) => {
    try {
      await axios
        .get(`/api/azur/test?searchText=${txt}`, {})
        .then((res) => {
          const ships: Ship[] = res.data.list
          setShipList(ships)
        })
        .catch((err) => {
          console.log(err)
          toast("API search: error!")
        })
    } catch (error) {
      console.error("Callback: error!")
      toast("Callback: error!")
      console.log(error)
    }
  }, [])

  const textInputHandler = useCallback(
    (e: any) => {
      const txt = e.target.value

      if (searchDelay > 0) {
        setSearchWaiting(true)
        if (searchDelayTimeout) {
          clearTimeout(searchDelayTimeout)
        }
        searchDelayTimeout = setTimeout(doStuff, searchDelay)
      } else {
        doStuff()
      }

      function doStuff() {
        setSearchWaiting(false)
        searchTextQuery(txt)
      }
    },
    [searchTextQuery]
  )

  const resetListHandler = useCallback(async () => {
    if (isDevEnv) toast("Reset")
    setShipList([] as Ship[])
  }, [])

  return (
    <>
      {/* container */}
      <div className="flex flex-row gap-5">
        {/* Filter buttons */}
        <Card className="flex w-[400px] flex-col gap-5 p-5">
          <div className="flex items-center gap-5">
            <Button onClick={azurApiHandler}>
              <RotateCw className="mr-2 size-4" /> Reload
            </Button>
            <Button onClick={resetListHandler}>
              <Ban className="mr-2 size-4" /> Reset
            </Button>
            <p>Ship Count: {shipList.length}</p>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            {/* TODO: use an icon */}
            <Label htmlFor="Search">Search</Label>
            <Input
              type="Search"
              id="Search"
              placeholder="Search"
              onChange={textInputHandler}
            />
          </div>
          {items.map((i) => (
            <div key={i.id}>
              <h1>{i.label}</h1>
              <div>
                {i.items.map((ii) => (
                  <div key={ii.id} className="flex items-center space-x-2">
                    <Checkbox key={ii.id} id={ii.id} />
                    <label>{ii.label}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Card>

        {/* Card results */}
        <Card className=" grow p-5 px-1">
          {/* based on AL wiki showing ship drops from event... */}
          {/* TODO: performance issues on thumbnails (50mb) -> webp? */}
          {true && (
            <div
              className="grid justify-evenly gap-y-5"
              style={{
                gridTemplateColumns: "repeat(auto-fill, 162px)",
              }}
            >
              {shipList.length > 0
                ? shipList.map((ship: Ship, idx) => {
                    if (idx > 25 && isDevEnv) return null
                    return <ShipCard ship={ship} key={ship.id} />
                  })
                : Array.from(Array(10).keys()).map((i) => {
                    return null
                    return <DummyCard key={`dummy-card-${i}`} />
                  })}
            </div>
          )}
        </Card>
      </div>
    </>
  )
}

export default AzurApiIndex
