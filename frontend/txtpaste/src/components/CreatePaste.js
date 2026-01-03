import { useState } from "react";
import { createPaste } from "../api";

function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setError("");
    setResult(null);


    try {
      const payload = {
        content,
        ...(ttl && { ttl_seconds: Number(ttl) }),
        ...(views && { max_views: Number(views) }),
      };

      const data = await createPaste(payload);
      setResult(data);
      setContent("");
      setTtl("");
      setViews("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Create Paste</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="6"
          placeholder="Paste content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          type="number"
          min={1}
          placeholder="TTL (seconds)"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
        />

        <input
          type="number"
          min={1}
          placeholder="Max views"
          value={views}
          onChange={(e) => setViews(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>

      {result && (
        <p>
          Share URL:{" "}
          <a
            href={result.url.replace(
              window.location.origin,
              "http://localhost:5000"
            )}
            target="_blank"
            rel="noreferrer"
          >
            {window.location.origin + "/p/" + result.id}
          </a>
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CreatePaste;
