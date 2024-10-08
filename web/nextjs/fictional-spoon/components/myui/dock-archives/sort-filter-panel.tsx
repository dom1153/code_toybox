import { Ship } from "@azurapi/azurapi/build/types/ship"
import { Label } from "@radix-ui/react-label"
import { Info } from "lucide-react"

import { isDevEnv } from "@/lib/myutils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"

import { InputCustom } from "../general/input-custom"
import FilterData from "./FilterData.json"
import SearchBoxFilter from "./search-box-filter"

// import data from "./FilterData.json"

interface ItemType {
  id: string
  label: string
  items: ItemTypeType[]
}

interface ItemTypeType {
  id: string
  label: string
}

let items: ItemType[] = [
  {
    id: "hull",
    label: "Hull",
    items: [
      { id: "main", label: "Main" },
      { id: "vanguard", label: "Vanguard" },
      { id: "dd", label: "DD" },
      { id: "main", label: "Main" },
      { id: "vanguard", label: "Vanguard" },
      { id: "dd", label: "DD" },
      { id: "cl", label: "CL" },
      { id: "ca", label: "CA" },
      { id: "bb", label: "BB" },
      { id: "cv", label: "CV" },
      { id: "ar", label: "AR" },
      { id: "ss", label: "SS" },
      { id: "misc-hull", label: "Misc" },
    ],
  },
]

// TODO use context???
export interface FilterProps {
  fullShipList: Ship[]
  updateShipList: any
  className?: string | null
}

const SortFilterPanel: React.FC<FilterProps> = ({
  fullShipList,
  updateShipList,
  className,
}) => {
  const FilterButtons = (
    <>
      {[
        FilterData.hull,
        FilterData.faction,
        FilterData.collab,
        FilterData.rarity,
        FilterData.availability,
        FilterData.special,
      ].map((section) => (
        <div key={section.label}>
          <h1 className="mt-4 text-lg font-bold">{section.label}</h1>
          <div className="flex flex-row flex-wrap gap-1">
            {section.options.map((i) => (
              <Toggle
                key={i.value}
                variant="outline"
                aria-label={`Toggle ${i.label}`}
              >
                <span>{i.label}</span>
              </Toggle>
            ))}
          </div>
        </div>
      ))}
    </>
  )

  // conider: overflow (single page app style; wayyyyy out of my league)
  return (
    <>
      <Card className={`w-[400px] pt-4 ${className}`}>
        <CardContent>
          <div className="flex flex-col gap-2">
            {false && (
              <div className="grid w-full max-w-sm items-center gap-1.5">
                {/* TODO: add an search icon */}
                <Label htmlFor="Search">Search</Label>
                <InputCustom
                  variant="outline"
                  type="search"
                  id="Search"
                  placeholder="Search..."
                  onChange={() => {}}
                />
              </div>
            )}
            <SearchBoxFilter
              filterComboLeftAlign
              fullShipList={fullShipList}
              updateShipList={updateShipList}
            />

            {FilterButtons}
            {/* {FilterData.hull.options.map((i) => (
              <div key={i.id}>
                <h1 className="">{i.label}</h1>
                <div className="flex flex-row flex-wrap gap-2">
                  {i.items.map((ii) => (
                    <Toggle
                      key={ii.id}
                      variant="outline"
                      aria-label={`Toggle ${ii.label}`}
                    >
                      <span>{ii.label}</span>
                    </Toggle>
                  ))}
                </div>
              </div>
            ))} */}
            {false && isDevEnv && ButtonOverflowTest}
            {false && isDevEnv && <p>{lorem}</p>}
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex grow flex-col">
            <div className="mb-2 flex justify-center">
              <p className="">
                {"x"} / {"y"} ships displayed
              </p>
            </div>
            <div className="flex grow gap-2">
              <Button variant="outline" className="grow">
                Clear {"z"} filter(s)
              </Button>
              <Button variant="outline" className="grow">
                <Info className="mr-2" /> Show all info
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default SortFilterPanel

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu velit nec leo auctor dictum. Maecenas sit amet maximus augue, in vestibulum ipsum. Suspendisse id magna cursus, efficitur nisl sed, dictum neque. In ex neque, eleifend ac erat id, finibus aliquet elit. In venenatis, ex quis efficitur varius, odio tellus efficitur leo, ac porta massa arcu eu ipsum. Donec non eros pulvinar, aliquet dui non, scelerisque mi. Fusce auctor at est ac vestibulum. Maecenas commodo facilisis lectus, vel auctor enim molestie sit amet. Ut ultrices turpis sit amet hendrerit porta. Suspendisse potenti. Vivamus non faucibus felis. Maecenas pellentesque erat id lacus elementum aliquam. Duis rhoncus, enim et pellentesque imperdiet, velit sapien malesuada elit, eu viverra risus neque quis nisi. Sed et risus purus. Integer venenatis ipsum ex, at varius mi vulputate nec. Aliquam ipsum arcu, interdum ut interdum et, condimentum at sapien. Proin at orci tortor. Aenean mollis egestas viverra. Donec in convallis nisl, ut maximus enim. Morbi justo lorem, interdum nec pulvinar sed, luctus in nunc. Nunc ut finibus lacus. Cras congue pretium ullamcorper. Praesent eu lectus quam. Donec tellus purus, rutrum a aliquet id, semper in enim. Integer congue elementum finibus. Cras varius scelerisque luctus. Maecenas nunc augue, porttitor in placerat at, maximus id odio. In pharetra at purus sed pretium. Sed porta porta quam semper suscipit. Etiam elit libero, ullamcorper eget ex ut, luctus vulputate felis. Maecenas viverra nulla sit amet mollis luctus. Donec egestas ipsum sit amet viverra elementum. Quisque ultricies ornare rhoncus. Donec ligula lectus, rhoncus sed porttitor at, tempus in massa. Etiam ac dolor sit amet turpis eleifend viverra quis a est. Suspendisse potenti. Aenean quis viverra velit. Fusce vulputate nisi cursus eros vestibulum, ut convallis nisi fermentum. Duis eu augue eget arcu tempus varius nec quis velit. Donec eget tortor accumsan, tristique est nec, sollicitudin est. Nulla non rutrum sem. Sed imperdiet nunc non magna rutrum, quis venenatis justo pharetra. Duis et quam lorem. Aliquam eget elit faucibus dui vulputate tincidunt sed vel ante. Nunc quis faucibus tellus. Nunc tincidunt urna id neque iaculis, non interdum felis blandit. Nullam ullamcorper, elit at pretium hendrerit, nulla sem condimentum purus, non viverra ex lacus non ipsum. Suspendisse augue velit, consequat eu pharetra quis, varius id arcu. Nullam nec mattis nisi, ut varius risus. Nunc gravida ornare urna sed suscipit."

const ButtonOverflowTest = (
  <div className="flex flex-col">
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
    <Button>a</Button>
  </div>
)
