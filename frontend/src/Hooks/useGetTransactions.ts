import axios from "axios";
import { useCallback, useState } from "react";
import { ServerSuccessfullResponseBody } from "../App.types";
import config from "../config";

const useGetTransactions = (): {
  loading: boolean;
  error: unknown;
  response: ServerSuccessfullResponseBody | null;
  fetchTransactions: (companyId: string) => Promise<void>;
} => {
  // const firstCallHandled = useRef(false);
  const [isLoading, setIfLoading] = useState(true);

  const [error, setError] = useState<unknown>(null);
  const [response, setResponse] =
    useState<ServerSuccessfullResponseBody | null>(null);

  const fetchTransactions = useCallback(async (companyId: string = "1") => {
    try {
      setIfLoading(true);
      const { status, data } = await axios.get(
        `${config.serverUrl}/company/optimal/${companyId}`
      );

      if (status === 200) {
        const { success, result, error: appError } = data;

        if (success) {
          setResponse(result);
        } else {
          setError(appError);
        }
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err);
    }

    setIfLoading(false);
  }, []);

  /*   useEffect(() => {
    if (isServerCallLoading && !firstCallHandled.current) {
      firstCallHandled.current = true;
      fetchTransactions();
    }
  }, [fetchTransactions, isServerCallLoading]); */

  return { loading: isLoading, error, response, fetchTransactions };
};

export default useGetTransactions;
