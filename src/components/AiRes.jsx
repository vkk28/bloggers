import React, { useState } from "react";
import { OpenAI } from "openai";
import { Input } from "../components";
import conf from "../conf/conf.js";
import loading from "../image/loading.gif";
import CopyToClipboard from "react-copy-to-clipboard";
import copy from "../image/copy.png";

function AiRes() {
  const [res, setRes] = useState(null);
  const [getResponse, setGetResponse] = useState(false);
  const [prompt, setPrompt] = useState("");
  const OPENAI_API_KEY = conf.openAiKey;

  const handleResponse = async () => {
    setGetResponse(true);
    try {
      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      setRes(completion.choices[0].message.content);
    } catch (error) {
      console.error(error);
    }

    setGetResponse(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap flex-col md:flex-row">
        <div className="w-full ">
          <Input
            label="Enter prompt :"
            type="text"
            accept="text"
            value={prompt}
            onChange={(event) => {
              setPrompt(event.target.value);
              setRes(false);
            }}
          />
          <button
            type="button"
            className="w-full mt-2 p-2 rounded-xl bg-secondary-color text-white hover:bg-hover-color hover:text-white "
            onClick={handleResponse}
          >
            Generate Response
          </button>
        </div>
        {getResponse ? (
          <div className="loading-container flex justify-content-center items-center mx-auto my-auto">
            <div className="flex flex-col p-10 mx-10">
              {getResponse && <img src={loading} alt="Loading" />}
            </div>
          </div>
        ) : (
          res && (
            <div>
              <div className="scrollable-text bg-gray-100 p-4 shadow-md overflow-y-auto border rounded-t-xl mt-2 w-full h-60 border-color: transparent">
                {res}
              </div>
              <div className="copy-button-container flex   flex-row-reverse  items-center rounded-b-xl  bg-gray-100">
                <CopyToClipboard text={res}>
                  <button className="copy-button flex items-center justify-center hover:bg-gray-200 text-gray-700 rounded-md p-2"
                  onClick={(e) => e.preventDefault()}>
                    
                    <img
                      src={copy}
                      alt="Copy to clipboard"
                      className="w-4 h-4 mr-1"
                    />
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default AiRes;
