
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function candidateRequest(path, options = {}) {
  const token = sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Please log in first.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
  console.error("Backend response:", result);
  console.error("Validation errors:", result.errors);

  const details = Array.isArray(result.errors)
    ? result.errors.join("\n")
    : "";

  throw new Error(
    details
      ? `${result.message}\n${details}`
      : result.message || "Candidate request failed."
  );
}

  return result.data ?? result;
}

export function getMyCandidateProfile() {
  return candidateRequest("/api/candidates/me");
}

export function saveCandidateProfile(profileData) {
  return candidateRequest("/api/candidates/profile", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
}
