const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function createPaste(payload) {
  const res = await fetch(`${API_BASE_URL}/api/pastes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}
