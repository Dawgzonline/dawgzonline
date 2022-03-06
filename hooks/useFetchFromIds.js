import { useEffect, useState } from "react";
import getLocalFetch from "../libs/fetch";

function useFetchFromIds(from, data) {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFunc = async () => {
      const destruct = {};
      for (const item of data) {
        for (const [key, value] of Object.entries(item)) {
          if (destruct[key]) {
            if (!destruct[key].includes(value)) {
              destruct[key].push(value);
            }
            continue;
          }
          destruct[key] = [value];
        }
      }
      const res = await getLocalFetch().get(
        `${from}?query=${JSON.stringify(destruct)}`
      );
      const newData = res.data;
      setFetchedData([...newData.product]);
      setLoading(false);
    };
    setLoading(false);
    if (data && data.length !== 0 && from) {
      setLoading(true);
      fetchFunc();
    }
  }, [data, from]);
  return [fetchedData, loading, setFetchedData];
}

export default useFetchFromIds;
