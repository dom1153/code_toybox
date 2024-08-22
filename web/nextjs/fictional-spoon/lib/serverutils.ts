import { cache } from "react"

import { checkUpdate } from "./azurapi"

export const getShipByUrl = cache((reqPath: string) => {
  //   await checkUpdate()
  console.log("looking for: ", reqPath)

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
  console.log("findings?:", result?.wikiUrl)
  return result
})
