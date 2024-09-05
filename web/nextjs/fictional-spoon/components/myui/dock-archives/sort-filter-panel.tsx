import { useCallback, useState } from "react"
import { Ship } from "@azurapi/azurapi/build/types/ship"
import { Checkbox } from "@radix-ui/react-checkbox"
import { Label } from "@radix-ui/react-label"

import { isDevEnv, searchShipList } from "@/lib/myutils"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

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

let searchDelayTimeout: any = undefined
const searchDelay = isDevEnv ? 0 : 100

// TODO use context???
interface FilterProps {
  fullShipList: Ship[]
  updateShipList: any
}

const SortFilterPanel: React.FC<FilterProps> = ({
  fullShipList,
  updateShipList,
}) => {
  const [searchText, setSearchText] = useState("")
  const [searchWaiting, setSearchWaiting] = useState(false)

  const textInputHandler = useCallback(
    (e: any) => {
      const txt = e.target.value

      function getShipListByTextSearch(text: string) {
        return searchShipList(fullShipList, text)
      }

      function doSearch() {
        setSearchWaiting(false)
        setSearchText(txt)
        const filteredShipList = getShipListByTextSearch(txt)
        updateShipList(filteredShipList)
      }

      // delay search wrapper code
      function delaySearch() {
        if (searchDelay > 0) {
          setSearchWaiting(true)
          if (searchDelayTimeout) {
            clearTimeout(searchDelayTimeout)
          }
          searchDelayTimeout = setTimeout(doSearch, searchDelay)
        } else {
          doSearch()
        }
      }

      delaySearch()
    },
    [fullShipList]
  )

  return (
    <>
      <Card className="flex w-[400px] flex-col gap-5 p-5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          {/* TODO: add an icon */}
          <Label htmlFor="Search">Search</Label>
          <Input
            type="Search"
            id="Search"
            placeholder="Search"
            onChange={textInputHandler}
          />
        </div>
        {items.map((i) => (
          <div key={i.id}>
            <h1 className="">{i.label}</h1>
            <div className="flex flex-row flex-wrap gap-2">
              {i.items.map((ii) => (
                <div
                  key={ii.id}
                  className="flex items-center space-x-2 rounded-md bg-gray-800 p-1"
                >
                  <Checkbox key={ii.id} id={ii.id} />
                  <label>{ii.label}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </>
  )
}

export default SortFilterPanel
