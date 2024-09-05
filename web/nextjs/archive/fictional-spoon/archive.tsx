// import React, { useCallback } from "react"
// import { Ship } from "@azurapi/azurapi/build/types/ship"
// import axios from "axios"

// UNUSED

interface UnusedProps {}

const Unused: React.FC<UnusedProps> = ({}) => {
  // const [fuseTextSearch, setFuseTextSearch] = useState(
  //   new Fuse(fullShipList, fuseTextSearchOptions)
  // )
  // const { data: fullShipList } = useFullShipList()

  // useEffect(() => {
  //   // fuse.setCollection exists
  //   setFuseTextSearch(new Fuse(fullShipList, fuseTextSearchOptions))
  // }, [fullShipList])

  function getShipListByTextSearch(text: string) {
    // fuse
    const result = fuseTextSearch.search(lowerText);
    console.log("Fuse: ", result);
    const unwrapResult = result.map((i) => {
      return i.item;
    });
    console.log("ShipArray:", unwrapResult);
    if (unwrapResult) {
      return unwrapResult;
    } else {
      return [];
    }
    return result as any;
  }

  const resetListHandler = useCallback(async () => {
    if (isDevEnv) toast("Reset");
    setShipList([] as Ship[]);
  }, []);

  function generateDummyCards() {
    Array.from(Array(10).keys()).map((i) => {
      return null;
      return <DummyCard key={`dummy-card-${i}`} />;
    });
  }

  const azurApiHandler = useCallback(async () => {
    try {
      if (isDevEnv) toast("Refreshing API");
      await axios
        .get(`/api/azur/test`, {})
        .then((res) => {
          const ships: Ship[] = res.data.list;
          if (isDevEnv) toast(`res size: ${ships.length}`);
          setShipList(ships);
        })
        .catch((err) => {
          console.log(err);
          if (isDevEnv) toast("API refresh: error!");
        });
    } catch (error) {
      if (isDevEnv) {
        console.error("Callback: error!");
        if (isDevEnv) toast("Callback: error!");
        console.log(error);
      }
    } finally {
      // console.info("Callback: success!")
    }
  }, []);

  const searchTextQuery = useCallback(async (txt: any) => {
    try {
      await axios
        .get(`/api/azur/test?searchText=${txt}`, {})
        .then((res) => {
          const ships: Ship[] = res.data.list;
          setShipList(ships);
        })
        .catch((err) => {
          console.log(err);
          toast("API search: error!");
        });
    } catch (error) {
      console.error("Callback: error!");
      toast("Callback: error!");
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="flex items-center gap-5">
        <Button onClick={azurApiHandler}>
          <RotateCw className="mr-2 size-4" /> Reload
        </Button>
        <Button onClick={resetListHandler}>
          <Ban className="mr-2 size-4" /> Reset
        </Button>
        <p>Ship Count: {shipList.length}</p>
      </div>
    </>
  );
};

// STUBS (less squiglies)
function toast(arg0: string) {}
function setShipList(ships: Ship[]) {}
let isDevEnv;
