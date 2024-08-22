import { AzurAPI } from "@azurapi/azurapi"

declare global {
  var azurapi: AzurAPI | undefined
  var isAzurApiUpdated: boolean
}

// A hack to prevent nextjs hotreloading from creating extra clients
const client = globalThis.azurapi || new AzurAPI()
if (process.env.NODE_ENV !== "production") globalThis.azurapi = client

// documentation states database updates automatically
// however first-time api call don't await the udpate, so we'll force it
export async function checkUpdate() {
  if (!globalThis.isAzurApiUpdated) {
    await globalThis.azurapi?.updater.update()
    globalThis.isAzurApiUpdated = true
  }
}

export default client
