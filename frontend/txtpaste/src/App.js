import CreatePaste from "./components/CreatePaste";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>PasteBin-Lite</h1>
        <p>Share text instantly. Simple. Secure.</p>
      </header>

      <main className="main">
        <CreatePaste />
      </main>

      <footer className="footer">
        <span> &copy; 2026 - PasteBin-Lite</span>
      </footer>
    </div>
  );
}

export default App;
