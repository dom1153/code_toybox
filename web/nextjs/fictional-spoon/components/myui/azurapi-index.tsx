"use client"

import { useCallback, useEffect, useState } from "react"
import { Ship } from "@azurapi/azurapi/build/types/ship"
import { Label } from "@radix-ui/react-label"
import Fuse from "fuse.js"
import toast from "react-hot-toast"

import { isDevEnv, searchShipList } from "@/lib/myutils"

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
      { id: "main", label: "Main" },
      { id: "vanguard", label: "Vanguard" },
      { id: "dd", label: "DD" },
      { id: "main", label: "Main" },
      { id: "vanguard", label: "Vanguard" },
      { id: "dd", label: "DD" },
      { id: "cl", label: "CL" },
      { id: "ca", label: "CA" },
      { id: "bb", label: "BB" },
      { id: "cv", label: "CV" },
      { id: "ar", label: "AR" },
      { id: "ss", label: "SS" },
      { id: "misc-hull", label: "Misc" },
    ],
  },
]

let searchDelayTimeout: any = undefined
const searchDelay = isDevEnv ? 0 : 100

interface AzurApiIndexProps {
  fullShipList: Ship[]
}

const fuseTextSearchOptions = {
  keys: ["names.en"],
  sortFn: (a: any, b: any) => {
    if (a.id < b.id) return -1
    if (a.id > b.id) return 1
    return 0
  },
  includeScore: true,
}

// @refresh reset
const AzurApiIndex = ({ fullShipList }: AzurApiIndexProps) => {
  // is shiplist not stored between pages? is it possible to change that?
  const [shipList, setShipList] = useState([] as Ship[])
  const [searchText, setSearchText] = useState("")
  const [searchWaiting, setSearchWaiting] = useState(false)
  const [fuseTextSearch, setFuseTextSearch] = useState(
    new Fuse(fullShipList, fuseTextSearchOptions)
  )
  // const { data: fullShipList } = useFullShipList()

  // // TODO: focus input bar via ref
  useEffect(() => {
    const bindKey = false
    if (bindKey) {
      const down = (e: KeyboardEvent) => {
        if ((e.key === "f" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
          if (
            (e.target instanceof HTMLElement && e.target.isContentEditable) ||
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLTextAreaElement ||
            e.target instanceof HTMLSelectElement
          ) {
            return
          }

          e.preventDefault()
          // setOpen((open) => !open)
        }
      }

      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }
  }, [])

  useEffect(() => {
    // fuse.setCollection exists
    setFuseTextSearch(new Fuse(fullShipList, fuseTextSearchOptions))
  }, [fullShipList])

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

      // generalize into lists
      function getShipListByTextSearch(text: string) {
        const lowerText = text.toLowerCase()
        const vanilla = true

        if (vanilla) {
          return searchShipList(fullShipList, text)
          // return fullShipList.filter((i: Ship) =>
          //   i.names.en.toLowerCase().includes(lowerText)
          // )
        } else {
          // fuse
          const result = fuseTextSearch.search(lowerText)
          console.log("Fuse: ", result)
          const unwrapResult = result.map((i) => {
            return i.item
          })
          console.log("ShipArray:", unwrapResult)
          if (unwrapResult) {
            return unwrapResult
          } else {
            return []
          }
          // return result as any
        }

        return []
      }

      function doStuff() {
        setSearchWaiting(false)
        setSearchText(txt)
        setShipList(getShipListByTextSearch(txt))
      }
    },
    [fullShipList]
  )

  const resetListHandler = useCallback(async () => {
    if (isDevEnv) toast("Reset")
    setShipList([] as Ship[])
  }, [])

  function generateDummyCards() {
    Array.from(Array(10).keys()).map((i) => {
      return null
      return <DummyCard key={`dummy-card-${i}`} />
    })
  }

  return (
    <>
      {/* container */}
      <div className="flex flex-row gap-5">
        {/* Filter buttons */}
        <Card className="flex w-[400px] flex-col gap-5 p-5">
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
                    if (!ship || (idx > 25 && isDevEnv)) return null
                    return <ShipCard ship={ship} key={ship.id} />
                  })
                : fullShipList.map((ship: Ship, idx) => {
                    if (idx > 25 && isDevEnv) return null
                    return <ShipCard ship={ship} key={ship.id} />
                  })}
            </div>
          )}
        </Card>
      </div>
    </>
  )
}

export default AzurApiIndex
