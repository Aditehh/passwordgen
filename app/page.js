"use client";
import { useState } from "react";

export default function Home() {
  const [length, setLength] = useState(0);
  const [includeUpper, setIncludeUpper] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState([]);

  // Function to generate password
  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+[]{}<>?/";

    if (!chars) {
      alert("Select at least one option!");
      return;
    }

    if(setLength < 6) {
      alert("cannot set small password");
      return;
    }

    

    let result = "";
    for (let i = 0; i < length; i++) {
      const randIndex = Math.floor(Math.random() * chars.length);
      result += chars[randIndex];
    }

    setPassword(result);

    // Update history with last 5 passwords
    setHistory((prev) => [...prev, result].slice(-15));
  };

  return (
    <div className="flex justify-center gap-12 p-12 bg-gray-100 min-h-screen">
      {/* Password Generator Box */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Password Generator
        </h1>

        {/* Password Length */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Password Length
          </label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Options */}
        <div className="mb-4 space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
            />
            <span>Include Uppercase</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            <span>Include Numbers</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            <span>Include Symbols</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mb-4">
          <button
            onClick={generatePassword}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Generate
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(password)}
            className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Copy
          </button>
        </div>

        {/* Output */}
        <div className="border rounded-lg p-3 bg-gray-50 text-center text-gray-700 font-mono">
          {password || "Your password will appear here"}
        </div>
      </div>

      {/* History Box */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Last 5 Passwords</h2>
        <ul className="space-y-2 font-mono text-gray-700">
          {history.length === 0 ? (
            <li className="text-gray-400">No passwords yet</li>
          ) : (
            history.map((pwd, i) => (
              <li key={i} className="border rounded-lg p-2 bg-gray-50">
                {pwd}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
