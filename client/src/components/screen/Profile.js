import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Profile = () => {
    const [mypics, setMypics] = useState([])
    const { state, dispatch} = useContext(UserContext)

    useEffect(() => {
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer " +localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setMypics(result.mypost);
        })
    },[])
    return (
        <div style={{maxWidth:"750px", margin:"0 auto "}}>
        {/* {console.log(state)} */}
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '14px 40px', padding: '5px', borderBottom: "1px solid gray" }}>
                <div style={{ margin: "10px auto" }}>
                    {/* <img style={{ width: '300px', height: '260px', borderRadius: '50%' }} src="./././img/profile_pic.jpg" /> */}
                    <img style={{ borderRadius: '50%' }} src={state?state.pic:"loading"} />
                </div>

                <div style={{ margin: "40px auto", display: "flex", justifyContent: "space-between" }}>

                    <div style={{ margin: "20px auto", }}><h3>{state? state.name : "loading" }</h3>

                        
                        <div style={{ display: "flex", justifyContent: "space-between", width: "110%" }}>
                            <h6>{mypics.length} posts</h6>
                            <h6>{state? state.followers.length :"0"} followers</h6>
                            <h6>{state? state.following.length:"0"} following</h6>
                        </div>
                    </div>
                </div>
            </div>

            <div className="gallery">
                {/* <div style={{ display: "flex", borderBottom: "1px solid gray", alignItems: "center", justifyContent: 'center' }}> */}

                {
                    mypics.map(item =>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                        )
                    })
                }
                    {/* <img className="item"  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60" alt="nature" /> */}
                {/* </div> */}

                {/* <div style={{ display: "flex", borderBottom: "1px solid gray", alignItems: "center", justifyContent: 'center' }}> */}
                    {/* <img className="item" src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60" alt="nature" /> */}
                {/* </div> */}

                 


            </div>
        </div>

    )
}
export default Profile;