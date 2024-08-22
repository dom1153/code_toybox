import { AzurAPI } from "@azurapi/azurapi"

declare global {
  var azurapi: AzurAPI | undefined
  var isAzurApiUpdated: boolean
}

// A hack to prevent nextjs hotreloading from creating extra clients
const client = globalThis.azurapi || new AzurAPI()
if (process.env.NODE_ENV !== "production") globalThis.azurapi = client

// documentation states database updates automatically
// however first-time api call don't await the update
// update: Actaully just gonna call the api too just in case...
export async function checkUpdate() {
  if (!globalThis.isAzurApiUpdated) {
    await globalThis.azurapi?.updater.update()
    globalThis.azurapi?.ships.id(`001`)

    let length = globalThis.azurapi?.ships.raw.length
    if (length && length > 1) globalThis.isAzurApiUpdated = true
  }
}

export default client
