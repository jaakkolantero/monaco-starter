import { useState } from "react";
import dynamic from "next/dynamic";
const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

const Index = () => {
  const [postBody, setPostBody] = useState("");

  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-black text-white px-10 py-1">
        <a
          className="underline"
          href="https://twitter.com/jaakkolantero"
          rel="noopener"
        >
          @jaakkolantero
        </a>
        's monaco editor
      </div>
      <div className="flex-1 py-12 px-10 bg-gray-100">
        <MonacoEditor
          editorDidMount={() => {
            // @ts-ignore
            window.MonacoEnvironment.getWorkerUrl = (
              _moduleId: string,
              label: string
            ) => {
              if (label === "json") return "_next/static/json.worker.js";
              if (label === "css") return "_next/static/css.worker.js";
              if (label === "html") return "_next/static/html.worker.js";
              if (label === "typescript" || label === "javascript")
                return "_next/static/ts.worker.js";
              return "_next/static/editor.worker.js";
            };
          }}
          width="800"
          height="600"
          language="markdown"
          theme="vs-dark"
          value={postBody}
          options={{
            minimap: {
              enabled: false
            }
          }}
          onChange={setPostBody}
        />
      </div>
      <div className="bg-black text-white py-12 px-10">
        based on article by swyx:{" "}
        <a
          className="underline"
          href="https://dev.to/swyx/how-to-add-monaco-editor-to-a-next-js-app-ha3"
          rel="noopener"
        >
          https://dev.to/swyx/how-to-add-monaco-editor-to-a-next-js-app-ha3
        </a>
      </div>
    </div>
  );
};

export default Index;
