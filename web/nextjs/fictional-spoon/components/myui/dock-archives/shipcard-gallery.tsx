import { Ship } from "@azurapi/azurapi/build/types/ship"

import { isDevEnv } from "@/lib/myutils"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

import ShipCard from "../general/shipcard"

interface ShipCardGalleryProps {
  shipList: Ship[]
}

const ShipCardGallery: React.FC<ShipCardGalleryProps> = ({ shipList }) => {
  return (
    <>
      <Card className="flex-1 overflow-hidden px-2 py-4">
        {/* Chakra SimpleGrid suggests auto-fit with minmax */}
        {/* FYI: fixed ShipCard (e.g. w-40) with breaks card gallery, so leave it dynamic*/}
        {/* Variable gaps?, fixed card size minmax(128px, 128px) */}
        {/* Variable cardSize, fixed gaps minmax(128px, 1fr) */}
        {/* Grid gap and any padding will determine flucatation between sizes */}
        {true && (
          <div
            className="grid justify-evenly gap-x-2 gap-y-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(110px, 110px))",
            }}
          >
            {shipList.length > 0 &&
              shipList.map((ship: Ship, idx) => {
                const limitShips = true

                if (!ship) return null
                if (limitShips && idx > 50 && isDevEnv) return null
                return <ShipCard ship={ship} key={ship.id} />
              })}
          </div>
        )}
      </Card>
    </>
  )
}

export default ShipCardGallery
