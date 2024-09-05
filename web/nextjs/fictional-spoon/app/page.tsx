import { sortDefault } from "@/lib/myutils"
import DockArchives from "@/components/myui/dock-archives-index"

export default async function IndexPage() {
  // TODO: this json is about 5mb and should be pruned
  const data = await fetch(
    "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json"
  )
    .then((res) => res.json())
    .then((responseJson) => sortDefault(responseJson))

  return (
    <>
      <DockArchives fullShipList={data} />
    </>
  )
}
