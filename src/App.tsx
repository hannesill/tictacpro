import { useState } from 'react'
import Switch from './Switch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className="bg-slate-100">You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <br />
      <Switch />
    </>
  )
}

export default App
