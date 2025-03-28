import React, { useRef, useEffect } from "react";
import "./TextInput.css";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="text-input-container">
      <textarea
        ref={textAreaRef}
        className="text-input-textarea"
        id="userInputTextArea"
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Be descriptive! The more detail you give, the better the results will be..."
      ></textarea>
    </div>
  );
};

export default TextInput;
