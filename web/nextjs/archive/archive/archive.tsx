// import React, { useCallback } from "react"
// import { Ship } from "@azurapi/azurapi/build/types/ship"
// import axios from "axios"

// UNUSED

interface UnusedProps {}

const Unused: React.FC<UnusedProps> = ({}) => {
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

  return (
    <>
      <div className="flex items-center gap-5">
        <Button onClick={azurApiHandler}>
          <RotateCw className="mr-2 size-4" /> Reload
        </Button>
        <Button onClick={resetListHandler}>
          <Ban className="mr-2 size-4" /> Reset
        </Button>
        <p>Ship Count: {shipList.length}</p>
      </div>
    </>
  )
}

// STUBS (less squiglies)
function toast(arg0: string) {}
function setShipList(ships: Ship[]) {}
let isDevEnv
