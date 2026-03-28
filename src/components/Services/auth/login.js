
export const handleLogin = async ({ authID, email, password }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data.user;
  } catch (err) {
    throw new Error(err.message || "Server error");
  }
};
