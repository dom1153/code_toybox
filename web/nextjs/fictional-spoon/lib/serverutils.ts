import { cache } from "react"

import azurapi from "@/lib/azurapi"

// === util funtions for 'use server' code

export const getShipByUrl = cache((reqPath: string) => {
  let result = azurapi?.ships.raw.find((s) => {
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
