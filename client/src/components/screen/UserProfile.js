import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const [userProfile, setProfile] = useState(null)
    
    // const [mypics, setMypics] = useState([])
    const { state, dispatch} = useContext(UserContext)
    const {userid} = useParams();
    const [showFollow, setShowFollow] = useState(state?!state.following.includes(userid):true)
    console.log(userid)

    useEffect(() => {
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer " +localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setProfile(result)
            // setMypics(result.mypost);
        })
    },[])

    const followUser = ()=>{
        fetch('/follow', {
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            dispatch({type:"UPDATE", payload:{following:data.following, followers:data.followers}})
            localStorage.setItem("user", JSON.stringify(data))
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers, data._id]
                    }
                }
            })
            setShowFollow(false)
        })
    }
    const unfollowUser = ()=>{
        fetch('/unfollow', {
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            dispatch({type:"UPDATE", payload:{following:data.following, followers:data.followers}})
            localStorage.setItem("user", JSON.stringify(data))
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item !== data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
            setShowFollow(true)
        })
    }
    return (
        <>
        { userProfile? <div style={{maxWidth:"750px", margin:"0 auto "}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '14px 40px', padding: '5px', borderBottom: "1px solid gray" }}>
                <div style={{ margin: "10px auto" }}>
                    <img style={{ width: '300px', height: '260px', borderRadius: '50%' }}  src="./././img/profile_pic.jpg"/>
                </div>

                <div style={{ margin: "40px auto", display: "flex", justifyContent: "space-between" }}>

                    <div style={{ margin: "20px auto", }}><h3>{userProfile.user.name  }</h3>
                    <h4>{userProfile.user.email }</h4>

                        <div style={{ display: "flex", justifyContent: "space-between", width: "110%" }}>
                            <h6>{userProfile.posts.length} posts</h6>
                            <h6>{userProfile.user.followers.length} followers</h6>
                            <h6>{userProfile.user.following.length} following</h6>
                        </div>
                        {showFollow?
                        <button style={{margin:"10px"}} className="btn waves-effect waves-light blue darken-1" onClick={()=>followUser()}>Follow</button> :
                        <button style={{margin:"10px"}} className="btn waves-effect waves-light blue darken-1" onClick={()=>unfollowUser()}>Unfollow</button> }
             
                
                    </div>
                </div>
            </div>

            <div className="gallery">
                {/* <div style={{ display: "flex", borderBottom: "1px solid gray", alignItems: "center", justifyContent: 'center' }}> */}

                {
                    userProfile.posts.map(item =>{
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
        </div> : <h2>"Loading..."</h2>  }
        
        </>

    )
}
export default Profile;