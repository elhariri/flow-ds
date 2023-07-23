import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { CompanyOption } from "../App.types";
import config from "../config";

const useGetCompaniesList = (): {
  loading: boolean;
  error: unknown;
  response: CompanyOption[] | null;
} => {
  const firstCallHandled = useRef(false);
  const [isServerCallLoading, setIfServerCallLoading] = useState(true);

  const [error, setError] = useState<unknown>(null);
  const [response, setResponse] = useState<CompanyOption[] | null>(null);

  const fetchCompaniesList = useCallback(async () => {
    try {
      setIfServerCallLoading(true);
      const { status, data } = await axios.get(
        `${config.serverUrl}/company/all`
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

    setIfServerCallLoading(false);
  }, []);

  useEffect(() => {
    if (isServerCallLoading && !firstCallHandled.current) {
      firstCallHandled.current = true;
      fetchCompaniesList();
    }
  }, [fetchCompaniesList, isServerCallLoading]);

  return { loading: isServerCallLoading, error, response };
};

export default useGetCompaniesList;
