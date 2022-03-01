import "./singlepost.css"
import blogImage from "../assets/image/blog-image.jpg";
import { useLocation } from "react-router";
import {Context} from "../context/Context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } =  useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false)


  useEffect(()=> {
    const getPost = async () => {
      const res = await axios.get(`/posts/${path}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try{
      await axios.delete(`/posts/${post._id}`, {data: {username: user.username}});
      window.location.replace("/");
    } catch(err){

    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`,  {
        username: user.username,
         title, 
         desc
      });
      // window.location.reload();
      setUpdateMode(false);
    } catch(err) {
      console.log(err)
    }
  }



  return (
    <>

    <div className="card mb-3 blog-post-font">

    {post.photo && 
      <img src={PF + post.photo} className="card-img-top blogImage" alt="..." />
    }

    
    
    <div className="card-body">

    {
      updateMode ? <input type="text" value={title} className="form-control col-12 shadow-none no-border" onChange={(e)=>setTitle(e.target.value)}/> : (
        <h5 className="card-title">
        {title}

        {
          post.username === user?.username && (
            <div className="float-right">
            <span><i className="fa fa-pencil-square-o text-info mr-2 cursor-pointer" aria-hidden="true" onClick={()=>setUpdateMode(true)}></i></span>
            <span><i className="fa fa-trash-o text-danger cursor-pointer" aria-hidden="true" onClick={handleDelete}></i></span>
          </div>
          )}
   </h5>
      )
    }
    
    <p className="card-text d-flex justify-content-between"><small className="text-muted">Arthor: <Link to={`/?user=${post.username}`} className="custom-link">{post.username}</Link> </small> <small className="text-muted">{new Date(post.createdAt).toDateString()}</small></p> 
    

    {
      updateMode ?  <textarea className="form-control  no-border shadow-none" type="text" onChange={(e)=>setDesc(e.target.value)}>{post.desc}</textarea> :
      (<p className="card-text text-secondary">{desc}</p>)
    }
      
    </div>

{
  updateMode && 
  <div className="card-footer d-flex justify-content-end">
  <button className="btn btn-danger" onClick={handleUpdate}>Update</button>
</div>
}
   
  </div>


  </>
  );
}

export default SinglePost;