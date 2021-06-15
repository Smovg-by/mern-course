import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import 'materialize-css'

function App () {
  const { login, logout, token, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isAuthenticated }}
    >
      <BrowserRouter>
        <div className='container'>
          <h1>{routes}</h1>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
