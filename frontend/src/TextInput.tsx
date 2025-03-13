import React from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  const resizeTextArea = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
    resizeTextArea(event.target);
  };

  return (
    <div className="form-group">
      <textarea
        className="form-control"
        id="userInputTextArea"
        rows={3}
        style={{ width: "50%" }}
        value={value}
        onChange={handleChange}
        placeholder="Be descriptive! The more detail you give, the better the results will be..."
      ></textarea>
    </div>
  );
};

export default TextInput;
