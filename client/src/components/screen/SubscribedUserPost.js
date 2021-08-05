import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom'
const Home = () => {
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch('/getsubpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(result => {
            console.log(result);
            setData(result.posts);
        })

    }, [])

    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json()).then(result => {
            console.log(result);
            const newData = data.map(item => {
                if (item._id === result._id) {
                    return result
                } else {
                    return item;
                }
            })
            setData(newData);
        }).catch(err => {
            console.log(err)
        })


    }
    const unlikePost = (id) => {
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json()).then(result => {
            console.log(result);
            const newData = data.map(item => {
                if (item._id === result._id) {
                    return result
                } else {
                    return item;
                }
            })
            setData(newData);
        }).catch(err => {
            console.log(err)
        })


    }

    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: postId,
                text: text
            })
        }).then(res => res.json()).then(result => {
            console.log(result)
            const newData = data.map(item => {
                if (item._id === result._id) {
                    return result
                } else {
                    return item;
                }
            })
            setData(newData);
        }).catch(err => {
            console.log(err)
        })

    }
    const deleteComment = (text, postId) => {
        fetch('/deletecomment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: postId,
                text: text
            })
        }).then(res => res.json()).then(result => {
            console.log(result)
            const newData = data.map(item => {
                if (item._id === result._id) {
                    return result
                } else {
                    return item;
                }
            })
            setData(newData);
        }).catch(err => {
            console.log(err)
        })

    }

    const deletePost = (postid) => {
        fetch(`/deletepost/${postid}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('jwt')
            }

        }).then(res =>
            res.json()).then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
            })

    }

    return (
        <div className="home">
            {data.map(item => {
                {/* {console.log(item)} */ }
                return (
                    <div className="card home-card" key={item._id}>
                        <h5 style={{ marginTop:"30px", padding:"10px"}}><Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"}>{item.postedBy.name}</Link>{item.postedBy._id === state._id && <i className="material-icons" style={{ float: "right", cursor: "pointer" }} onClick={() => deletePost(item._id)}>delete</i>}</h5>
                        <div className="card-image">
                            <img src={item.photo} alt="wallpaper" />
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{ color: "red" }}>favorite</i>
                            {item.likes.includes(state._id) ? <i className="material-icons" onClick={() => { unlikePost(item._id) }} style={{ cursor: "pointer" }}>tthumb_down</i> : <i className="material-icons" onClick={() => { likePost(item._id) }} style={{ cursor: "pointer" }}>tthumb_up</i>}


                            <h6>{item.likes.length}  likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            {/* {console.log(item.postedBy.name)} */}
                            {
                                item.comments.map(record => {

                                    return (
                                        <h6 key={record._id}><span style={{ fontWeight: "500" }}>{record.postedBy.name}</span>{record.text}</h6>
                                    )
                                })
                            }
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                // console.log(e.target[0].value);}}
                                makeComment(e.target[0].value, item._id)

                            }}>
                                <input type="text" placeholder="add a comment" />

                            </form>
                        </div>
                    </div>
                )
            })}

            {/* <div className="card home-card">
                <h5>David Smith</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1476970980147-71209edbfa4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="wallpaper" />
                </div>
                <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>Beautiful Aurora</p>
                    <input type="text" placeholder="add a comment" />
                </div>
            </div> */}
        </div>
    )
}
export default Home;