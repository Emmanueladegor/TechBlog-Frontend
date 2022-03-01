import "./posts.css";
import Post from "../post/Post";

const Posts = ({posts}) => {
  return (
   <>
{
posts.map(p=> (
 
  <Post key={p._id} post={p} />
))
}
   </>
 
  );
}

export default Posts;