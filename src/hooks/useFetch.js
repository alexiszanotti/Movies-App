import { useState, useEffect } from "react";

export const useFetch = url => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(url);
      const res = await data.json();
      setData(res.results ? res.results : res);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, isLoading, error, setData };
};
