import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import '../assets/css/style.css';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-gray-100 dark:bg-gray-600 light-mode">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <nav className="bg-gray-800 text-white px-5 py-3 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <a className="flex items-center mb-2 sm:mb-0" href="#">
            <img src={require("../assets/images/RCE.png")} alt="Logo" width="25" height="25" className="mr-2" />
            Remote Code Execution
          </a>
          <div className="space-x-4 flex items-center">
            <NavLink className="text-white hover:text-gray-300" to="login">Login</NavLink>
            <NavLink className="text-white hover:text-gray-300" to="login">Register</NavLink>
            <a href="https://aashishpandey.tech">
              <img src={require("../assets/images/buy_me_a_coffee.png")} alt="BUY ME A COFFEE" width="25" height="25" title="Buy Me a Coffee" className="ml-4" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Main() {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('python');

  const runCode = async () => {
    setOutput("")
    try {
      const response = await fetch('/exec-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scriptContent: code,
          lang: language,
          input: input,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const reader = response.body.getReader();
      let decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        setOutput(result);
      }

      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <main className="container mx-auto mt-10 dark:bg-gray-600">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 dark:bg-gray-600">
        <SectionLeft code={code} setCode={setCode} runCode={runCode} language={language} setLanguage={setLanguage} />
        <SectionRight input={input} setInput={setInput} output={output} />
      </div>
    </main>
  );
}

function SectionLeft({ code, setCode, runCode, language, setLanguage }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <label htmlFor="language" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Select Language</label>
        <select id="language" value={language} onChange={e => setLanguage(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300">
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="code" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Code Editor</label>

        <Editor
          height="400px"
          language={language}
          defaultValue={code}
          theme="vs"
          onChange={(value) => setCode(value)}
        />
        <button id="run" onClick={runCode} className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">Run</button>
      </div>
    </div>
  );
}

function SectionRight({ input, setInput, output }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <div className="mb-4">
        <label htmlFor="input" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Enter Input (if needed)</label>
        <textarea id="input" value={input} onChange={e => setInput(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300" rows={9} placeholder="Enter input here"></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="output" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Output</label>
        <textarea id="output" value={output} readOnly className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300" placeholder="Output here" disabled rows={10}></textarea>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10 p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-lg">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="#home" className="hover:text-gray-400">Home</a></li>
            <li><a href="https://github.com/ashishsingh9457" target="_blank" className="hover:text-gray-400">Projects</a></li>
            <li><a href="#blog" className="hover:text-gray-400">Blog</a></li>
            <li><a href="mailto:ashishksingh9457@gmail.com" target="_blank" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg">Follow Me</h3>
          <ul className="mt-4 space-x-4">
            <li><a href="https://github.com/ashishsingh9457" target="_blank" className="hover:text-gray-400">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/ashish-kumar-singh-a689a4208/" target="_blank" className="hover:text-gray-400">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p>&copy; 2024 Ashish Kumar Singh | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Home;
