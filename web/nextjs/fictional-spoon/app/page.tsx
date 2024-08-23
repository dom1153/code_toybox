import fsPromises from "fs/promises"
import path from "path"
import { GetStaticProps, InferGetStaticPropsType } from "next"

import AzurApiIndex from "@/components/myui/azurapi-index"

export default async function IndexPage() {
  const data = await fetch(
    "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json"
  ).then((res) => res.json())

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-start gap-2">
        <section className="container">
          <AzurApiIndex fullShipList={data} />
        </section>
      </div>
    </section>
  )
}
