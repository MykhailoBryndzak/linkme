import {useState, useCallback} from "react"

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    setLoading(true);
    try {
      if(body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, {method, body, headers});
      const data = await response.json();

      if(!response.ok) {
        setErrorData(data.errors);
        throw new Error(data.message || "Something went wrong while doing request to server")
      }
      setLoading(false);

      return data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  }, []);
  const clearError = useCallback(() => setError(null), []);
  const clearErrorData= useCallback(() => setErrorData(null), []);


  return {loading, request, error, errorData, clearError, clearErrorData}
};
