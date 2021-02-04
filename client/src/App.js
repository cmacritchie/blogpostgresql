import React, { useEffect } from 'react'

import { HashRouter,  Route } from 'react-router-dom';
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

  //Add protected Route
  return (
    <HashRouter >
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route path="/sign-up" component={Signup} />
      <Route exact path="/post-article" component={protectedRoute(NewArticle)} />
      <Route exact path="/post-article/:articleid" component={protectedRoute(NewArticle)} />
    </HashRouter>
  );
}

export default App;
