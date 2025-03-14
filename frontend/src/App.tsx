import React, { useState } from "react";
import { Button, Card, Spinner, Alert } from "react-bootstrap";
import TextInput from "./TextInput";
import axios from "axios";

import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [showDownload, setShowDownload] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Project generation triggered with text: ", text);

    setIsLoading(true);
    setShowDownload(false);
    setErrorMessage(null); // Clear any previous error messages

    try {
      const response = await axios.post("http://localhost:5000/generate", {
        prompt: text,
      });

      if (response.data.download_url) {
        setDownloadUrl(response.data.download_url);
        setShowDownload(true);
      } else if (response.data.error) {
        // Handle specific error message from the backend
        setErrorMessage(response.data.error);
      } else {
        setErrorMessage(
          "No download URL received. Please try again or use a different description."
        );
      }
    } catch (error) {
      console.error("Error generating project:", error);

      // Extract and display meaningful error messages
      if (axios.isAxiosError(error) && error.response) {
        // Handle structured error responses from the server
        if (error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else if (error.response.status === 429) {
          setErrorMessage(
            "Too many requests. Please wait a moment and try again."
          );
        } else if (error.response.status === 500) {
          setErrorMessage(
            "Server error occurred. The AI model might be experiencing issues processing your request."
          );
        } else {
          setErrorMessage(
            `Error ${error.response.status}: ${error.response.statusText}`
          );
        }
      } else if (error instanceof Error) {
        // Handle network errors or other JS errors
        if (error.message.includes("Network Error")) {
          setErrorMessage(
            "Network error. Please check your connection and ensure the server is running."
          );
        } else {
          setErrorMessage(`Error: ${error.message}`);
        }
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
          <Button type="submit" disabled={isLoading}>
            Generate Project
          </Button>
        </form>
      </div>

      {errorMessage && (
        <Alert variant="danger" className="mt-3">
          <p className="mb-0">{errorMessage}</p>
        </Alert>
      )}

      {isLoading && (
        <Card className="mt-3">
          <Card.Body>
            <p>
              Your request has been sent. Please wait while your files are being
              generated...
            </p>
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </Card.Body>
        </Card>
      )}

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
