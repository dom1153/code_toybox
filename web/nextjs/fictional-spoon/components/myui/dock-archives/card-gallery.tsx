import { Ship } from "@azurapi/azurapi/build/types/ship"

import { isDevEnv } from "@/lib/myutils"
import { Card } from "@/components/ui/card"

import ShipCard from "../general/shipcard"

interface CardGalleryProps {
  shipList: Ship[]
}

const CardGallery: React.FC<CardGalleryProps> = ({ shipList }) => {
  return (
    <>
      <Card className=" grow p-5 px-1">
        {/* grid based on AL wiki showing ship drops from event... */}
        {true && (
          <div
            className="grid justify-evenly gap-y-5"
            style={{
              gridTemplateColumns: "repeat(auto-fill, 162px)",
            }}
          >
            {shipList.length > 0 &&
              shipList.map((ship: Ship, idx) => {
                const limitShips = true

                if (!ship) return null
                if (limitShips && idx > 25 && isDevEnv) return null
                return <ShipCard ship={ship} key={ship.id} />
              })}
          </div>
        )}
      </Card>
    </>
  )
}

export default CardGallery
