import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

     const Signup = () => {
        const history = useHistory();
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [image, setImage] = useState("");
        const [url, setUrl] = useState("");
        useEffect(()=>{
            if(url){
                uploadFields()
            }
        },[url])

        const uploadPic = ()=>{
            const data = new FormData()
            data.append("file",image)
            data.append("upload_preset", "insta-clone")
            data.append("cloud_name","dxbg5sodl")
            fetch("https://api.cloudinary.com/v1_1/dxbg5sodl/image/upload", {
            method:"post",
            body: data
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            setUrl(data.url)
    
        }).catch(err=>{
            console.log(err)
        })
    
        
    
        }
        const uploadFields = () =>{
            if(! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
                M.toast({html: 'Invalid Email', classes: '#e53935 red darken-1'})
                return;
            }
            fetch("/signup", {
                method: "post",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name:name,
                    email:email,
                    password:password,
                })

                }).then(res=>res.json()).then(data=>{
                    // console.log(data)
                    if (data.error){
                        M.toast({html: data.error, classes: '#e53935 red darken-1'})
                    }else{
                        M.toast({html: data.message, classes: '#7cb342 light-green darken-1'})
                        history.push('/login')

                    }
                }).catch(err=>{
                    console.log(err);
                })

        }
        const PostData = () =>{
            if(image){
                uploadPic()
            }else{
                uploadFields()
            }
            
           
        }

         return (
            <div className="myCard">
                    <div className="card auth-card input-field">
                        <h2>Instagram</h2>
                        <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} />
                        <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><div className="file-field input-field">
                <div className="btn blue darken-1">
                    <span>Upload Profile Picture</span>
                    {/* <input type="file" onChange={(e) =>console.log(e.target.files[0])} /> */}
                    <input type="file" onChange={(e) =>setImage(e.target.files[0])} />
                </div>
                </div> 
                        <button className="btn waves-effect waves-light blue darken-1" onClick={()=>PostData()}>Signup
                     
                        </button>
                        <h6>
                            <Link to="/login">Already have an account?</Link>
                        </h6>
                    </div>
                </div>
            )
}
export default Signup ;