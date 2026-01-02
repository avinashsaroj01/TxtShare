export async function createPaste(payload) {
  const res = await fetch("http://localhost:5000/api/pastes", {
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
