import { AzurAPI } from "@azurapi/azurapi"
import { Ship } from "@azurapi/azurapi/build/types/ship"

import { isDevEnv } from "./myutils"

declare global {
  var azurapi: AzurAPI | undefined
  var azurShipJson: Ship[] | undefined
  var isAzurApiUpdated: boolean
}

// A hack to prevent nextjs hotreloading from creating extra clients
// const client = isDevEnv ? globalThis.azurapi || new AzurAPI() : undefined
// if (process.env.NODE_ENV !== "production") globalThis.azurapi = client

export function azurShipDB() {
  if (globalThis.azurShipJson && globalThis.azurShipJson?.length > 0) {
    return globalThis.azurShipJson
  }

  // fetch is async but like it'll get there via SWR
  fetchDb()

  // console.log("fetchdb:", globalThis.azurShipJson)
  return globalThis.azurShipJson ? globalThis.azurShipJson : []
}

// Documentation states database updates automatically
// However, first-time api call don't await the update
export async function checkUpdate() {
  if (!globalThis.isAzurApiUpdated) {
    // not sure if update call is doing anything
    await globalThis.azurapi?.updater.update()
    // api query usually calls update at some point otherwise
    globalThis.azurapi?.ships.id(`001`)

    let length = globalThis.azurapi?.ships.raw.length
    if (length && length > 1) globalThis.isAzurApiUpdated = true
  }
}

// get the json cuz vercel can't write permissions due to serverless functions...
// TODO: write a cleaner fetch call...
function fetchDb() {
  return fetch(
    "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json",
    {
      // cache: "force-cache",
    }
  )
    .then((result) => {
      if (!result.ok) {
        handleError(`Response status ${result.status}`)
        console.log("useAzurApi || Bad response: ", result)
        return null
      }
      return result.json()
    }, handleError)
    .then((result) => {
      if (!result) return
      let ships: Array<Ship> = result

      // sort by internal id instead of default
      ships.sort((a: Ship, b: Ship) => {
        if (a.id < b.id) return -1
        if (a.id > b.id) return 1
        return 0
      })

      globalThis.azurShipJson = ships
    }, handleError)
}

function handleError(error: string) {
  console.log("Error with azurApi: ", error)
}

// export default client
