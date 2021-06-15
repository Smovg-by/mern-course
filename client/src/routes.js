import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { AuthPage } from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    // console.log('LinksPage')
    return (
      <Switch>
        <Route path='/links'>
          <LinksPage />
        </Route>
        <Redirect to='/links' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path='/' exact>
        <AuthPage />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}
