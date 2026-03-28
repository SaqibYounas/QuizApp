export async function signup({ auth0Id, name, email }) {
    const BASE_URL = import.meta.env.VITE_API_URL;

    try {
        const response = await fetch(`${BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ auth0Id, name, email }),
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
