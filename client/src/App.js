import React, { useEffect } from 'react'

import { HashRouter, Router,  Route } from 'react-router-dom';
import Cookie from 'js-cookie'
import { useDispatch } from "react-redux";
import NavBar from './components/NavBar'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NewArticle from './pages/NewArticle'
import protectedRoute from './HOC/protectedRoute'

import { getMe } from './actions/userActions'
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory()
// export let history = createBrowserHistory();



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe())
  })

  return (
    <HashRouter >
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route path="/sign-up" component={Signup} />
      <Route exact path="/post-article" component={NewArticle} />
      <Route exact path="/post-article/:articleid" component={NewArticle} />
    </HashRouter>
  );
}

export default App;
