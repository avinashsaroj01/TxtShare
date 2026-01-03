```md
# 📝 Pastebin Lite

A **minimal Pastebin-like application**  
It allows users to create text pastes, generate shareable links, and optionally restrict access using **time-based expiry (TTL)** or **view limits**.

Deployed Link : https://txt-share-eta.vercel.app/

## 🚀 Key Features

- ✅ Create and share text pastes
- 🔗 Shareable URL for each paste
- ⏱ Optional **TTL (time-to-live)**
- 👁 Optional **maximum view limit**
- ❌ Paste becomes unavailable when **any constraint is met**
- 🧪 **Deterministic expiry support** for automated testing
- ❤️ Health check endpoint
- 🔒 Safe HTML rendering (no script execution / XSS)

---

## 🛠 Tech Stack

- **Frontend:** React (Create React App)
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas (persistent storage)
- **Deployment:** Vercel (serverless)

---

## 🌐 Deployed URLs

- **Frontend:** https://txt-share-eta.vercel.app  
- **Backend:** https://backendnew1.vercel.app  

---

## 📡 API Endpoints

### ✅ Health Check
```

GET /api/healthz

````

Response:
```json
{ "ok": true }
````

---

### ✍️ Create Paste

```
POST /api/pastes
```

Request body:

```json
{
  "content": "string",
  "ttl_seconds": 60,
  "max_views": 5
}
```

Response:

```json
{
  "id": "string",
  "url": "https://txt-share-eta.vercel.app/p/<id>"
}
```

---

### 📥 Fetch Paste (API – consumes view)

```
GET /api/pastes/:id
```

Response:

```json
{
  "content": "string",
  "remaining_views": 4,
  "expires_at": "2026-01-01T00:00:00.000Z"
}
```

⚠️ **Each successful API fetch consumes exactly one view.**

---

### 🌐 View Paste (HTML – does NOT consume view)

```
GET /p/:id
```

* Returns an HTML page with paste content
* **Does not consume views**
* Returns **404** if paste is expired or unavailable
* Content is safely escaped (no XSS / script execution)

---

## ⏱ Deterministic Time Testing (IMPORTANT)

To support automated tests, the backend allows **mocking the current time**.

If the environment variable is set:

```
TEST_MODE=1
```

And the request header is provided:

```
x-test-now-ms: <milliseconds since epoch>
```

➡️ The backend treats this value as the **current time**
➡️ This allows expiry logic to be tested **without waiting in real time**

---

## 💾 Persistence Layer

* Uses **MongoDB Atlas**
* Required for **serverless deployment**
* Data persists across requests and deployments
* No in-memory storage is used

---

## ▶️ Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_atlas_connection_string
TEST_MODE=1
```

---

### Frontend

```bash
cd frontend
npm install
npm start
```

Create `frontend/.env`:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

---

## ⚙️ Design Decisions

* **HTML view (`/p/:id`) does NOT consume views**
* **API fetch (`/api/pastes/:id`) consumes views**
* Paste expires when **TTL OR max views** is reached
* MongoDB connection is **cached** to support Vercel serverless execution
* No secrets or credentials are committed
* No hardcoded environment values



