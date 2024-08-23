// import fetcher from "@/libs/fetcher"
import axios from "axios"
import useSWR from "swr"

export const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data.list)

const useFullShipList = () => {
  const { data, error, isLoading } = useSWR(`/api/azur/test`, fetcher)

  return { data, error, isLoading }
}

export default useFullShipList
