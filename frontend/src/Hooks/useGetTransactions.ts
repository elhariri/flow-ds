import axios from "axios";
import { useEffect, useState } from "react";
import { ServerSuccessfullResponseBody } from "../App.types";
import config from "../config";

const useGetTransactions = (): {
  loading: boolean;
  error: unknown;
  response: ServerSuccessfullResponseBody | null;
} => {
  const [isServerCallLoading, setIfServerCallLoading] = useState(true);

  const [error, setError] = useState<unknown>(null);
  const [response, setResponse] =
    useState<ServerSuccessfullResponseBody | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { status, data } = await axios.get(config.serverUrl);

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
    };

    if (isServerCallLoading) {
      fetchTransactions();
    }
  }, [isServerCallLoading]);

  return { loading: isServerCallLoading, error, response };
};

export default useGetTransactions;
