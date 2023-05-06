import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./RichTextEditor.css";

const RichTextEditor = ({ value, onChange }) => {
  const quillRef = useRef();
  const toolbarRef = useRef();
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    if (isEditorReady) return;

    const quill = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: toolbarRef.current,
      },
    });

    quill.on("text-change", () => {
      onChange(quill.root.innerHTML);
    });

    if (value) {
      quill.root.innerHTML = value;
    }

    setIsEditorReady(true);
  }, [isEditorReady, value, onChange]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ "header": [1, 2, false] }],
    [{ "align": [] }],
    ["link"],
    [{ "color": [] }, { "background": [] }],
  ];

  return (
    <div className="richTextEditorContainer" style={{ width: "50rem", height: "30rem" }}>
      <div id="toolbar" ref={toolbarRef}>
        {toolbarOptions.map((group, index) => (
          <span className="ql-formats" key={index}>
            {group.map((format) => (
              <button className={`ql-${format}`} key={format} />
            ))}
          </span>
        ))}
      </div>
      <div ref={quillRef} />
    </div>
  );
};

export default RichTextEditor;

//다시 눌렀을때 원래대로 돌아오게 하는 예를 들어 볼드를 다시누르면 볼드가 풀리는 효과 추가해줘
//그리고 버튼들이 안보이는 부분이 있어