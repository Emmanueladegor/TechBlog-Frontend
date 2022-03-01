import { useEffect, useState } from "react";
import Header from "../../header/Header";
import Posts from "../../posts/Posts";
import Sidebar from "../../sidebar/Sidebar";
import "./home.module.css"
import axios from "axios";
import { useLocation } from "react-router";
import { set } from "mongoose";

const Home = () => {

    const [posts, setPosts] = useState([]);
    const {search} = useLocation();

    useEffect(()=> {
        const fetchPosts = async () => {
        const res = await axios.get(`/posts/${search}`);
        console.log(res.data)
        setPosts(res.data)
        };

        fetchPosts();
    }, [search]);

    return (
        <>
        <Header />
        <div className="container">
        <div className="row mt-4">
            <div className="col-md-8 col-sm-12 col-xs-12">
            <Posts posts={posts}/>
            </div>

            <div className="col-md-4 col-sm-12 col-xs-12 center-card">
            <Sidebar />
            </div>
            
        </div>
 
        </div>
        </>
        
    );
}

export default Home;