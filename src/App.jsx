import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1 className="text-red-700">Meme generator</h1>
      </div>
    </>
  );
}

export default App;
