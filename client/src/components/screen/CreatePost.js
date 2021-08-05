import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import { Link, useHistory } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const history = useHistory();

    useEffect(()=>{
        if(url){

        fetch("/createpost", {
            method: "post",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                
                title,
                body,
                pic:url
            })
    
            }).then(res=>res.json()).then(data=>{
                // console.log(data)
                if (data.error){
                    M.toast({html: data.error, classes: '#e53935 red darken-1'})
                }else{
                    M.toast({html: 'Created post Successfully', classes: '#7cb342 light-green darken-1'})
                    history.push('/')
    
                }
            }).catch(err=>{
                console.log(err);
            })
        }
       
    }, [url])


    const postDetails = ()=>{
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


    return (
        <div className="card input-field" style={{ margin: "10px auto", maxWidth: "700px", padding: "200px", textAlign: "center" }}
        >
            <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}

            />
            <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn blue darken-1">
                    <span>Upload Image</span>
                    {/* <input type="file" onChange={(e) =>console.log(e.target.files[0])} /> */}
                    <input type="file" onChange={(e) =>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light blue darken-1" onClick={()=>postDetails()}>SUBMIT POST

                </button>
        </div>
    )
}
export default CreatePost;