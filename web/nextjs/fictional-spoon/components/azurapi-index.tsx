"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Ship } from "@azurapi/azurapi/build/types/ship"
import { Label } from "@radix-ui/react-label"
import axios from "axios"
import { Ban, RotateCw } from "lucide-react"
import toast from "react-hot-toast"

import { isDevEnv, shipToUrl } from "@/lib/myutils"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

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

  useEffect(() => {
    if (shipList.length <= 0) azurApiCall()
  }, [])

  const azurApiCall = useCallback(async () => {
    try {
      toast("Refreshing API")
      await axios
        .get(`/api/azur/test`, {})
        .then((res) => {
          const ships: Ship[] = res.data.list
          toast(`res size: ${ships.length}`)
          setShipList(ships)
        })
        .catch((err) => {
          console.log(err)
          toast("API refresh: error!")
        })
    } catch (error) {
      console.error("Callback: error!")
      toast("Callback: error!")
      console.log(error)
    } finally {
      // console.info("Callback: success!")
    }
  }, [])

  const querySearchText = useCallback(
    async (txt: any) => {
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
    },
    [searchText]
  )

  const inputHandler = useCallback((e: any) => {
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
      querySearchText(txt)
    }
  }, [])

  const resetList = useCallback(async () => {
    toast("Reset")
    setShipList([] as Ship[])
  }, [])

  const DummyCard = (i: any) => {
    return (
      <div className="">
        <Card className="w-40">
          <div className="flex justify-center py-1">
            <p>{`🅱️enterprise`}</p>
          </div>
          <CardContent className="relative p-0">
            <img
              src={`https://azurlane.netojuu.com/images/6/64/EnterpriseShipyardIcon.png`}
              alt="Default"
              className=""
            />
            {false && (
              <div className="absolute bottom-3 left-0 w-full bg-zinc-950">
                <p className="text-center">{`🅱️enterprise`}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const genShipCard = (ship: Ship) => {
    return (
      <div key={ship.id} className="">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {/* TODO: this needs to be a custom card class */}
              <Link href={shipToUrl(ship)}>
                <Card className="w-40">
                  <div className="flex justify-center py-1">
                    <p>{ship.names.en}</p>
                  </div>
                  <CardContent className="relative p-0">
                    <img src={ship.thumbnail} alt="Default" className="" />
                    {/* <Image src={ship.thumbnail} width={192} height={256} /> */}
                    {false && (
                      <div className="absolute bottom-3 left-0 w-full bg-zinc-950">
                        <p className="text-center">{ship.names.en}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="font-mono">
              <div className="">
                <p>id: {ship.id}</p>
                <p>hull: {ship.hullType}</p>
                <p>faction: {ship.nationality}</p>
                <p>rarity: {ship.rarity}</p>
                <p>class: {ship.class}</p>
                <p>retrofit: {ship.retrofit ? "y" : "n"}</p>
                <p>
                  skins:{" "}
                  {ship.skins.reduce((partialSum, i) => partialSum + 1, 0)}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }

  return (
    <>
      {/* container */}
      <div className="flex flex-row gap-5">
        {/* Filter buttons */}
        <Card className="flex w-[400px] flex-col gap-5 p-5">
          <div className="flex items-center gap-5">
            <Button onClick={azurApiCall}>
              <RotateCw className="mr-2 size-4" /> Reload
            </Button>
            <Button onClick={resetList}>
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
              onChange={inputHandler}
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
          {/* this solution works, but does not fill the card size */}
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
                    if (idx > 25) return null
                    return genShipCard(ship)
                  })
                : Array.from(Array(10).keys()).map((i) => {
                    // if (!isDevEnv) return null
                    return <DummyCard i={i} key={`card-${i}`} />
                  })}
            </div>
          )}
        </Card>
      </div>
    </>
  )
}

export default AzurApiIndex
