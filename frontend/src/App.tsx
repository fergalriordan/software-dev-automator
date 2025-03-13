import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import TextInput from "./TextInput";

import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [showDownload, setShowDownload] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Project generation triggered with text: ", text);
    
    // Simulating immediate visibility of the download button (replace with backend response later)
    setShowDownload(true);
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
        <form onSubmit={handleSubmit}>
          <TextInput value={text} onChange={setText} />
          <Button type="submit">Generate Project</Button>
        </form>
      </div>

      {showDownload && (
        <Card className="mt-3">
          <Card.Body>
            <p>Your project files are ready to download!</p>
            <Button variant="success" onClick={() => console.log("Download triggered")}>
              Download Files
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default App;
