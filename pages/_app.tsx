import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { runArmLang } from "arm-lang";

function MyApp({ Component, pageProps }: AppProps) {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [outputDisplay, setOutputDisplay] = useState<string>("");
  const [outputList, setOutputList] = useState<string[]>([]);

  setInterval(() => {
    setOutputDisplay(outputList.join("\n"));
  }, 500);

  return (
    <div style={{ display: "flex", width: "100%", padding: 20 }}>
      <div>
        <div>
          <textarea
            style={{ height: 500, width: 1200 }}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button
            onClick={() => {
              const res = runArmLang(code, (data) => {
                outputList.push(`${data}`);
              });
              setError(!res);
            }}
          >
            Run!!
          </button>{" "}
          <button
            onClick={() => {
              outputList.splice(0, outputList.length);
            }}
          >
            Clear output
          </button>{" "}
          {error && <span style={{ color: "red" }}>Syntax Error</span>}
        </div>
      </div>
      <div style={{ marginLeft: 10 }}>
        <pre>{outputDisplay}</pre>
      </div>
    </div>
  );
}

export default MyApp;
