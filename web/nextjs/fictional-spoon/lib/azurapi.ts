import { AzurAPI } from "@azurapi/azurapi"

declare global {
  var azurapi: AzurAPI | undefined
  var isAzurApiUpdated: boolean
}

// A hack to prevent nextjs hotreloading from creating extra clients
const client = globalThis.azurapi || new AzurAPI()
if (process.env.NODE_ENV !== "production") globalThis.azurapi = client

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

export default client
