import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import {UserContext} from '../../App'


const Login = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory();
        
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const PostData = () =>{
            if(! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
                M.toast({html: 'Invalid Email', classes: '#e53935 red darken-1'})
                return;
            }
            fetch("/login", {
                method: "post",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    
                    email:email,
                    password:password,
                })

                }).then(res=>res.json()).then(data=>{
                    console.log(data)
                    if (data.error){
                        M.toast({html: data.error, classes: '#e53935 red darken-1'})
                    }else{
                        localStorage.setItem("jwt",data.token)
                        localStorage.setItem("user",JSON.stringify(data.user))
                        dispatch({type:"USER", payload:data.user})
                        M.toast({html: 'Successfully Signed in', classes: '#7cb342 light-green darken-1'})
                        history.push('/')

                    }
                }).catch(err=>{
                    console.log(err);
                })
           
        }

    return (
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light blue darken-1" onClick={()=>PostData()}>Login
             
                </button>
                        <h6>
                            <Link to="/signup">No account? Create a new one</Link>
                        </h6>
                        <h6>
                            <Link to="/reset">Forgot password ?</Link>
                        </h6>
            </div>
        </div>
    )
}
export default Login;