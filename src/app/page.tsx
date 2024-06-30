"use client";

import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/server",
    onError: (e) => {
      console.log(e);
    },
  });

  const renderers = {
    code: ({ language, value }) => {
      return (
        <SyntaxHighlighter style={docco} language={language}>
          {value}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <div className="bg-emerald-300 p-12 h-full">
      <h1 className="text-center text-2xl font-semibold uppercase underline">DevEye AI</h1>
      <p className="text-center mb-4">An App that generates Codes and Docs</p>
      <form onSubmit={handleSubmit} className="">
        <input
          className="border-2 border-black rounded-3xl justify-center w-full h-8 p-12"
          value={input}
          placeholder="Message DevEye AI..."
          onChange={handleInputChange}
        />
      </form>
      <div className="flex flex-col bg-white w-full border-2 rounded-3xl min-h-screen border-black px-12 py-6 mt-12">
        <h1 className="text-center text-lg font-semibold uppercase mb-4 underline">Output</h1>
        {messages.map((m) => (
          <div key={m.id} className="mt-4">
            {m.role === "user" ? (
              <>
                <strong>User: </strong>
                <br />
                <span className="">{m.content}</span>
              </>
            ) : (
              <>
                <strong>DevEye AI: </strong>
                <br />
                <ReactMarkdown className="text-blue-600">
                  {m.content}
                </ReactMarkdown>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
