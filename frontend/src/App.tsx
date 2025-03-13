import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import TextInput from "./TextInput";
import axios from "axios";

import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [showDownload, setShowDownload] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Project generation triggered with text: ", text);

    try {
      const response = await axios.post("http://localhost:5000/generate", {
        prompt: text,
      });

      if (response.data.download_url) {
        setDownloadUrl(response.data.download_url);
        setShowDownload(true);
      } else {
        console.error("Error: No download URL received.");
      }
    } catch (error) {
      console.error("Error generating project:", error);
    }
  };

  const handleDownload = () => {
    window.open("http://localhost:5000" + downloadUrl, "_blank");
  };

  return (
    <>
      <div>
        <h1>Automated Web Development with the DeepSeek API</h1>
      </div>
      <p>
        Enter a description of the website you want to build and click "Generate
        Project". The DeepSeek API will be used to generate all the necessary
        files and directories for the project. You can then download these files
        and customize them as needed.
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
            <Button variant="success" onClick={handleDownload}>
              Download Files
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default App;
