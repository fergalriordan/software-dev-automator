import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TextInput from "./TextInput";

import "./App.css";

function App() {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    console.log("Project generation triggered with text: ", text);
  };

  return (
    <>
      <div>
        <h1>Automated Web Development with the DeepSeek API</h1>
      </div>
      <p>
        Enter a description of the website you want to build and click "Generate
        Project". The DeepSeek API will be used to generate all the necessary files and
        directories for the project. You can then download these files and
        customize them as needed.
      </p>
      <div className="card">
        <form>
          <TextInput value={text} onChange={setText} />
          <Button type="button" onClick={handleSubmit}>Generate Project</Button>
        </form>
      </div>
    </>
  );
}

export default App;
