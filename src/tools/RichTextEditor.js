import React, { memo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

const RichTextEditor = memo(({ value, onChange }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: ["small", false, "large", "huge"] }, { color: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
    ],
  };

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        theme="snow"
        className="quillEditor"
      />
    </div>
  );
});

export default RichTextEditor;
