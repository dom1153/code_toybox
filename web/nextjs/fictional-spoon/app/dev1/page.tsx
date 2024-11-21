import { ScrollArea } from "@/components/ui/scroll-area"
import DummyCard from "@/components/myui/general/dummy-card"

const NUM_ITEMS = 700

// Testing a 100vh card scroll using overflow ; works on desktop (maybe not mobile though)
// not very browser friendly design
export default async function IndexPage() {
  return (
    <>
      <div className="flex size-full max-h-full flex-row bg-blue-950">
        <div className="flex-1 bg-green-900 p-2">
          <p>A</p>
          <div className="bg-purple-900"></div>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem-1px)] flex-1 bg-red-900">
          <p>B</p>
          <div className="flex flex-row flex-wrap justify-center gap-2">
            {Array.from(Array(NUM_ITEMS).keys()).map((index) => (
              <DummyCard key={`dummy-card-${index}`} idx={index} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
