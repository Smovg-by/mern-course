import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'
import 'materialize-css'

function App () {
  const routes = useRoutes(false)
  return (
    <BrowserRouter>
      <div className='container'>
        <h1>{routes}</h1>
      </div>
    </BrowserRouter>
  )
}

export default App
