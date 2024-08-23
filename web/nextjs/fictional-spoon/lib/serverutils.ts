import { cache } from "react"
import { Ship } from "@azurapi/azurapi/build/types/ship"

// === util funtions for 'use server' code

export const getShipByUrl = cache((fullShipList: Ship[], reqPath: string) => {
  let result = fullShipList.find((s) => {
    let wikiUrl = new URL(s.wikiUrl)
    let path = wikiUrl.pathname
    let generatePath = `/wiki/${reqPath}`

    if (path === generatePath) {
      console.log(path, generatePath, wikiUrl.href)
      return true
    }
    return false
  })
  return result
})
