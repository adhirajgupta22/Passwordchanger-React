import React, { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setlength] = useState(8);
  const [numberallowed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState('');

  //useref hook
  const passwordref= useRef(null)

  const passwrodgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) str += '0123456789';
    if (charallowed) str += '!@#$%&-+~';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setpassword(pass); // Update the password state
  }, [length, numberallowed, charallowed,setpassword]);

  const copypasswordtoclipboard= useCallback(()=>{
    passwordref.current?.select()   //it will copy even after this is not given
    window.navigator.clipboard.writeText(password)
  },[password])  //dependency here is only on password 

  useEffect(() => {
    passwrodgenerator();
  }, [length, numberallowed, charallowed, passwrodgenerator]);
   
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg my-8 py-4 text-orange-500 px-4 bg-gray-800'>
        <h1 className='text-white text-center text-2xl my-3 mx-2'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}   //password balue from useState
            className='w-full outline-none py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordref}
          />
          <button onClick={copypasswordtoclipboard}  className='bg-blue-700 text-white px-5 py-4 outline-2  hover:bg-blue-400'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label> length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberallowed}
              id='characterinput'
              onChange={() => {
                setcharallowed((prev) => !prev);
              }}
            />
            <label htmlFor='characterinput'> Characters</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberallowed}
              id='number-input'
              onChange={() => {
                setnumberallowed((prev) => !prev); //instead of just writing true we fired a callback so as to work it on all the cases
              }}
            />
            <label htmlFor='characterinput'> Numbers</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
