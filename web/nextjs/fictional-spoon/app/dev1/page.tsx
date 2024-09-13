import { ScrollArea } from "@/components/ui/scroll-area"
import DummyCard from "@/components/myui/general/dummy-card"

const NUM_ITEMS = 700

// Testing a 100vh card scroll using overflow ; works on desktop (maybe not mobile though)
// not very browser friendly design
export default async function IndexPage() {
  return (
    <>
      <div className="flex flex-row w-full bg-blue-950 h-full max-h-full">
        <div className="bg-green-900 flex-1 p-2">
          <p>A</p>
          <div className="bg-purple-900"></div>
        </div>
        <ScrollArea className="bg-red-900 flex-1 h-[calc(100vh-4rem-1px)]">
          <p>B</p>
          <div className="flex flex-row flex-wrap gap-2 justify-center">
            {Array.from(Array(NUM_ITEMS).keys()).map((index) => (
              <DummyCard key={`dummy-card-${index}`} idx={index} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
