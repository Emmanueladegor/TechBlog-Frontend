import "./post.css"
import {Link} from "react-router-dom";


const Post = ({post}) => {
  
  const PF = "http://localhost:5000/images/";

  return (
    <>

    <div className="card mb-3 blog-post-font">
      {post.photo && <img src={PF + post.photo} className="card-img-top blogImage" alt="..." />
      }
    
    <div className="card-body">
    <p className="card-text"><small className="text-muted">{new Date(post.createdAt).toDateString()}</small></p>
        <Link to={`/post/${post._id}`} className="text-decoration-none text-dark">
        <h5 className="card-title">{post.title}</h5>
        </Link>
      
      <p className="card-text text-secondary">{post.desc}</p>
      <p className="card-text">
      <small className="text-muted">
        {post.categories.map(c=>(
          <span>{c.name}</span>
        ))}
      </small>
      </p>
      
    </div>
  </div>
  </>
  );
}

export default Post;