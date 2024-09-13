import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"

interface DummyCardProps {
  idx?: number
}

const DummyCard: React.FC<DummyCardProps> = ({ idx }) => {
  return (
    <div className="">
      <Card className="w-40">
        <div className="flex justify-center py-1">
          <p>{`🅱️enterprise ${idx || ""}`}</p>
        </div>
        <CardContent className="relative p-0">
          <Image
            src={`https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/images/skins/077/thumbnail.png`}
            alt="Default (Enterprise)"
            width={192}
            height={256}
            className=""
          />
          {false && (
            <div className="absolute bottom-3 left-0 w-full bg-zinc-950">
              <p className="text-center">{`🅱️enterprise`}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DummyCard
