import axios from "axios";
import { useEffect, useState } from "react";
import { ServerSuccessfullResponse } from "../App.types";

const useGetTransactions = (): {
  loading: boolean;
  error: unknown;
  response: ServerSuccessfullResponse | null;
} => {
  const [isServerCallLoading, setIfServerCallLoading] = useState(true);

  const [error, setError] = useState<unknown>(null);
  const [response, setResponse] = useState<ServerSuccessfullResponse | null>(
    null
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { status, data } = await axios.get("/");

        if (status === 200 && data.success) {
          setResponse(data.body);
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
