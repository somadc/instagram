import React, { createContext, useEffect, useReducer, useContext } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/screen/Home';
import Signup from './components/screen/Signup';
import Login from './components/screen/Login';
import Profile from './components/screen/Profile';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import CreatePost from './components/screen/CreatePost';
import UserProfile from './components/screen/UserProfile';
import SubscribedUserPost from './components/screen/SubscribedUserPost.js';
import {reducer, initialState} from './reducer/userReducer';
import Reset from './components/screen/Reset';
import NewPassword from './components/screen/NewPassword';
// import { createContext } from 'react/cjs/react.development';

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    // console.log(typeof(user), user)
    if(user){
      dispatch({ type: 'USER', payload:user})
      // history.push('/')
    }
    else{
     if (!history.location.pathname.startsWith('/reset'))
      history.push('/login')
    }
  },[])
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route exact path="/profile/:userid">
        <UserProfile />
        </Route>
      <Route exact path="/myfollowingpost">
        <SubscribedUserPost />
      </Route>
      <Route exact path="/reset">
        <Reset />
      </Route>
      <Route  path="/reset/:token">
        <NewPassword />
      </Route>
    </Switch>
  )
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state:state, dispatch:dispatch}} >
    <BrowserRouter>
      <Navbar />
      <Routing />

    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;