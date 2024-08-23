import { Card, CardContent } from "@/components/ui/card"

interface DummyCardProps {}

const DummyCard: React.FC<DummyCardProps> = ({}) => {
  return (
    <div className="">
      <Card className="w-40">
        <div className="flex justify-center py-1">
          <p>{`🅱️enterprise`}</p>
        </div>
        <CardContent className="relative p-0">
          <img
            src={`https://azurlane.netojuu.com/images/6/64/EnterpriseShipyardIcon.png`}
            alt="Default"
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
