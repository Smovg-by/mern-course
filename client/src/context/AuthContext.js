import { createContext } from 'react'

// пустая функция, которая ничего не делает

function noop () {}

export const AuthContext = createContext({
  login: noop(),
  logout: noop(),
  token: null,
  userId: null,
  isAuthenticated: false
})
