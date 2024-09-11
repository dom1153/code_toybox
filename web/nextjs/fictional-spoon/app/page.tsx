import { isDevEnv, sortDefault } from "@/lib/myutils"
import DockArchives from "@/components/myui/dock-archives-index"

// https://github.com/microsoft/TypeScript/issues/48364

export default async function IndexPage() {
  // TODO: this json is about 5mb and should be pruned
  // https://github.com/vercel/next.js/discussions/48324
  // "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json"
  const data = await fetch(
    "https://raw.githubusercontent.com/dom1153/code_toybox/main/web/nextjs/archive/ships-details.json",
    { cache: isDevEnv ? "no-cache" : "default" }
  )
    .then((res) => res.json())
    .then((responseJson) => sortDefault(responseJson))

  return (
    <>
      <DockArchives fullShipList={sortDefault(data as any)} />
    </>
  )
}
