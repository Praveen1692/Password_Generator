import React, { useCallback, useEffect, useRef, useState } from "react";

function Project() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook
  const passwordRef=useRef();


  const passwordGenerator = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789";
    }
    if (character) {
      str += "#$%&*!?@-_+=~`[]{}|;:',.<>/?^";
    }
    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);

 useEffect(()=>{
  passwordGenerator();

 },[length,number,character,passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-600 bg-gray-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex-shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />

        <button 
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        onClick={()=>{
          navigator.clipboard.writeText(passwordRef.current.value);
          alert('Copied to clipboard');

        }}
        
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
      </div>
      <div className='flex items-center gap-x-1'>
        <input
          type="checkbox"
          defaultChecked={character}
          id="characterInput"
          onChange={() => {
            setCharacter((prev) => !prev);
          }}
        />
        <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
  );
}

export default Project;
