import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

export function useApiToken() {
  const { getAccessTokenSilently } = useAuth0();

  const getToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: import.meta.env.VITE_API_AUDIENCE,
      });
      return token;
    } catch (error) {
      console.error("Failed to get API token:", error);
      return null;
    }
  }, [getAccessTokenSilently]);

  return getToken;
}
