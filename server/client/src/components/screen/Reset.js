import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';



const Reset = () => {

    const history = useHistory();
    const [email, setEmail] = useState("");


    const PostData = () => {
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            M.toast({ html: 'Invalid Email', classes: '#e53935 red darken-1' })
            return;
        }
        fetch("/reset-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                email: email,
               
            })

        }).then(res => res.json()).then(data => {
            // console.log(data)
            if (data.error) {
                M.toast({ html: data.error, classes: '#e53935 red darken-1' })
            } else {
                
                M.toast({ html: data.message, classes: '#7cb342 light-green darken-1' })
                history.push('/login')

            }
        }).catch(err => {
            console.log(err);
        })

    }

    return (
        <div className="myCard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              
                <button className="btn waves-effect waves-light blue darken-1" onClick={() => PostData()}>reset password

                </button>
              
            </div>
        </div>
    )
}
export default Reset;