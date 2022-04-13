import type { NextPage } from 'next'
import { useState } from 'react'

import CodeMirror from '@uiw/react-codemirror'

const { NEXT_PUBLIC_API_URL } = process.env

const Home: NextPage = () => {
  const [value, setValue] = useState('(Main) = (S (S (Z)))')
  const [result, setResult] = useState(null)

  const handleExecuteCode = async (code: string) => {
    const data = await fetch(NEXT_PUBLIC_API_URL as string, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: code })
    }).then((response) => response.json())

    setResult(data.result)
  }

  return (
    <div className='h-screen flex items-center justify-center flex-col'>
      <div className='w-full'>
        <CodeMirror
          className='max-w-4xl relative m-auto border border-black'
          height='500px'
          value='(Main) = (S (S Z))'
          onChange={(value) => setValue(value)}
        />
        <div className='flex flex-row max-w-4xl m-auto mt-3'>
          <div className='w-full border border-black'>
            <p className='font-mono text-sm p-2'>{`λ> ${!result ? '' : result}`}</p>
          </div>
          <button className='border border-black ml-1 px-3' onClick={(_) => handleExecuteCode(value)}>run</button>
        </div>
      </div>
    </div>
  )
}

export default Home
