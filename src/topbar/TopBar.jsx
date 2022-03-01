import {useContext} from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import {Context} from "../context/Context";

const TopBar = () => {
  const {user, dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({type: "LOGOUT"});
  }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark logo-font">
  <Link to="/write" className="navbar-brand">Tech Blog</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
          <Link to="/" className="nav-link">HOME</Link>
      </li>
 
      <li className="nav-item">
      <Link to="/write" className="nav-link">WRITE</Link>
      </li>
      <li className="nav-item mt-2 ml-3 text-white cursor-pointer" onClick={handleLogout}>
      {user && "LOGOUT"}
      </li>
      <li className="nav-item ml-3">
      <form className="navbar-form form-inline">
					<div className="input-group search-box">								
						<input type="text" id="search" className="form-control" placeholder="Search Here..." />
						<div className="input-group-append">
							<span className="input-group-text">
                            <i className="fa fa-search" aria-hidden="true"></i>
							</span>
						</div>
					</div>
                </form>
      </li>
 
    </ul>

    <ul className="navbar-nav">

      {
        user ? (
         <Link to="/settings">
            <li className="nav-item cursor-pointer">
          <img src={PF + user.profilePic} width="40" height="40" className="rounded-circle" />
          </li> 
         </Link> 
        ): (
          <>
          <li className="nav-item">
          <Link to="/login" className="nav-link">LOGIN</Link>
          </li>
          <li className="nav-item">
          <Link to="/register" className="nav-link">REGISTER</Link>
          </li>
          </>
        )
      }
   
   
      </ul>
  
  </div>
			{/* <a href="#" className="nav-item nav-link"><i className="fa fa-2x fa-facebook-official" aria-hidden="true"></i></a>
			<a href="#" className="nav-item nav-link"><i className="fa fa-2x fa-twitter-square" aria-hidden="true"></i></a>
			<a href="#" className="nav-item nav-link"><i className="fa fa-2x fa-instagram" aria-hidden="true"></i></a>
			<a href="#" className="nav-item nav-link"><i className="fa fa-2x fa-pinterest-square" aria-hidden="true"></i></a> */}
     
</nav>
    );
};

export default TopBar;