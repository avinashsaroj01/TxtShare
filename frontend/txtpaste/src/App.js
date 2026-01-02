import CreatePaste from "./components/CreatePaste";

function App() {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Pastebin Lite</h1>
      <CreatePaste />
    </div>
  );
}

export default App;
