import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { ServerSuccessfullResponseBody } from "../App.types";
import config from "../config";

const useGetTransactions = (): {
  loading: boolean;
  error: unknown;
  response: ServerSuccessfullResponseBody | null;
  fetchTransactions: (url?: string) => Promise<void>;
} => {
  const firstCallHandled = useRef(false);
  const [isServerCallLoading, setIfServerCallLoading] = useState(true);

  const [error, setError] = useState<unknown>(null);
  const [response, setResponse] =
    useState<ServerSuccessfullResponseBody | null>(null);

  const fetchTransactions = useCallback(async (url: string = "") => {
    try {
      setIfServerCallLoading(true);
      const { status, data } = await axios.get(`${config.serverUrl}/${url}`);

      if (status === 200) {
        const { success, result } = JSON.parse(data.body);
        if (success) {
          setResponse(result);
        } else {
          setError(result);
        }
      } else {
        setError(data.body);
      }
    } catch (err) {
      setError(err);
    }

    setIfServerCallLoading(false);
  }, []);

  useEffect(() => {
    if (isServerCallLoading && !firstCallHandled.current) {
      firstCallHandled.current = true;
      fetchTransactions();
    }
  }, [fetchTransactions, isServerCallLoading]);

  return { loading: isServerCallLoading, error, response, fetchTransactions };
};

export default useGetTransactions;
