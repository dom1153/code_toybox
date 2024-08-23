import { cache } from "react"

import { azurShipDB } from "./azurapi"

// === util funtions for 'use server' code

export const getShipByUrl = cache((reqPath: string) => {
  const shipJson = azurShipDB()
  let result = shipJson?.find((s) => {
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
