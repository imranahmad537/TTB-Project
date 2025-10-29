import { useState } from 'react'
import Form from './Pages/Form'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Form/>
    </>
  )
}

export default App
