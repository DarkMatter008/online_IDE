
import { useState } from "react";
import Editor from "@monaco-editor/react";
import Navbar from "./Components/Navbar";
import Axios from "axios";
import "./App.css";

import spinner from "./assets/my-loader.svg";

function App() {
  // State variable to set users source code
  const [userCode, setUserCode] = useState(``);

  // State variable to set editors default language
  const [userLang, setUserLang] = useState("python");

  // State variable to set editors default theme
  const [userTheme, setUserTheme] = useState("vs-dark");

  // State variable to set editors default font size
  const [fontSize, setFontSize] = useState(20);

  // State variable to set users input
  const [userInput, setUserInput] = useState("");

  // State variable to set users output
  const [userOutput, setUserOutput] = useState("");

  // Loading state variable to show spinner
  // while fetching data
  const [loading, setLoading] = useState(false);

  const options = {
    fontSize: fontSize,
  };

  function compile() {
    setUserOutput("");
    setLoading(true);
    if (userCode === ``) {
      return ;
    }
    // Post request to compile endpoint
    Axios.post(`http://localhost:8000/compile`, {
      code: userCode,
      language: userLang,
      input: userInput,
    })
      .then((res) => {
        setUserOutput(res.data.output);
      })
      .then(() => {
        setLoading(false);
      });
  }

  // Function to clear the output screen
  function clearOutput() {
    setUserOutput("");
  }

  // Function to clear the input screen
  function clearInput() {
    const textarea = document.getElementById('code-inp');
    textarea.value = '';
  }

  return (
    <div className="App">
      <Navbar
        userLang={userLang}
        setUserLang={setUserLang}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <div className="main">
        {/* left part */}
        <div className="left-container">
          <Editor
            options={options}
            height="calc(100vh - 50px)"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="python3"
            defaultValue="# Enter your code here..."
            onChange={(value) => {setUserCode(value)}}
          />
          <button className="run-btn" onClick={() => compile()}>
            Run
          </button>
        </div>
        {/* right part */}
        <div className="right-container">
          <h4>Input :</h4>
          <div className="input-box">
            <textarea
              id="code-inp"
              onChange={(e) => setUserInput(e.target.value)}>
            </textarea>
            <button
                  onClick={() => {clearInput()}}
                  className="clear-btn" >
                  Clear
            </button>
          </div>
          <h4>Output :</h4>
          <div className="output">
            {loading ? (
              <div className="spinner-box">
                <img src={spinner} alt="Loading..."></img>
              </div>
            ) : (
              <div className="output-box">
                <pre>
                  <code>
                    {userOutput}
                  </code>
                </pre>

                <button
                  onClick={() => {clearOutput()}}
                  className="clear-btn" >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
