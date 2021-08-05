import React, { useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () =>{
  const { state, dispatch } = useContext(UserContext)
  const history = useHistory()
  const renderList = () =>{
    const Logout = () =>{
     
      localStorage.clear()
      dispatch({type:"CLEAR"})
      history.push('/login')
    }

    if(state){
      return [
           <li><Link to="/profile">Profile</Link></li>,
            <li><Link to="/create">Create Post</Link></li>,
            <li><Link to="/myfollowingpost">My Following Post</Link></li>,
            <li>
               <button className="btn waves-effect waves-light #f44336 red" onClick={()=>Logout()}>Logout
            
             </button>
            </li>
      ]
    }else{
      return [
        <li><Link to="/signup">Signup</Link></li>,
        <li><Link to="/login">Login</Link></li>
      ]
    }
  }
    return (
        <nav>
        <div className="nav-wrapper white">
          <Link to={state? "/" : "/login"} className="brand-logo left" style={{paddingLeft:"20px"}}>Instagram</Link>
          <ul id="nav-mobile" className="right " style={{paddingRight:"20px"}}>
            {renderList()}
           
          </ul>
        </div>
      </nav>
    )
}

export default Navbar;