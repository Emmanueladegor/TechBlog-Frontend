import "./sidebar.css";
import sideImage from "../assets/image/sidebar-image.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {

  const [cats, setCats] = useState([]);

  useEffect(()=> {
    const getCats = async () => {
        const res = await axios.get("/categories")
        setCats(res.data);
    };

    getCats();
  }, [])

  return (
    <>
      <div className="card shadow mb-1 bg-danger text-white sidebar-font" style={{ width: '18rem' }}><h5 className="mt-3 mx-auto">ABOUT ME</h5></div>
      <div className="card shadow" style={{ width: '18rem' }}>
        <img src={sideImage} className="card-img-top sideImage" alt="" />
        <div className="card-body">
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>

      <div className="card shadow mb-1 mt-4 bg-danger text-white sidebar-font" style={{ width: '18rem' }}><h5 className="mt-3 mx-auto">CATEGORIES</h5></div>

      {/* <div className="card" style={{ width: '18rem' }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Life</li>
          <li className="list-group-item">Music</li>
          <li className="list-group-item">Style</li>
          <li className="list-group-item">Tech</li>
          <li className="list-group-item">Sport</li>
          <li className="list-group-item">Cinema</li>
        </ul>
      </div> */}

<div className="card shadow categories px-3 py-3" style={{ width: '18rem' }}>
               
                            <ul className="list-unstyled categories-clouds m-b-0">
                                {/* <li><a href="#">Life</a></li>
                                <li><a href="#">Music</a></li>
                                <li><a href="#">Style</a></li>
                                <li><a href="#">Tech</a></li>
                                <li><a href="#">Sport</a></li>
                                <li><a href="#">Cinema</a></li> */}
                                {cats.map(c=>(
                                 
                                  <li key={c._id}><Link to={`/?cat=${c.name}`} className="custom-link">{c.name}</Link></li>
                                  
                                ))}
                            </ul>
                    
                    </div>

      <div className="card shadow mb-1 mt-4 bg-danger text-white sidebar-font" style={{ width: '18rem' }}><h5 className="mt-3 mx-auto">FOLLOW US</h5></div>
      <div className="card shadow" style={{ width: '18rem' }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between"> 
          <i className="fa fa-2x fa-facebook-official" aria-hidden="true"></i> 
          <i className="fa fa-2x fa-twitter-square" aria-hidden="true"></i>
          <i className="fa fa-2x fa-instagram" aria-hidden="true"></i>
          <i className="fa fa-2x fa-pinterest-square" aria-hidden="true"></i>
          </li>
         
        </ul>
      </div>
      
    </>
  );
}

export default Sidebar;