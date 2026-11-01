
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed. Please try again.");
  }

  return result;
};


export const registerUser = async ({ email, password, role }) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, role }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Signup failed. Please try again.");
  }

  return result;
};

