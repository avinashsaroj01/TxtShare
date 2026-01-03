import { useState } from "react";
import { createPaste } from "../api";
import "./CreatePaste.css";

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
    <div className="card">
      <h2>Create a new paste</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="7"
          placeholder="Paste your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="row">
          <input
            type="number"
            min="1"
            placeholder="TTL (seconds)"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
          />

          <input
            type="number"
            min="1"
            placeholder="Max views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
        </div>

        <button type="submit">Create Paste</button>
      </form>

      {result && (
        <div className="result">
          <span>Share link:</span>
          <a href={`/p/${result.id}`} target="_blank" rel="noreferrer">
            {window.location.origin + "/p/" + result.id}
          </a>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CreatePaste;
