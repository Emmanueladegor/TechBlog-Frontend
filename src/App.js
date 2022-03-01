import TopBar from "./topbar/TopBar";
import Home from "./pages/home/Home";
import Write from "./pages/write/Write";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import {useContext} from "react";
import {Context} from "./context/Context";

import { Routes, Route, Link } from "react-router-dom";


const App = () => {
  const {user} = useContext(Context);
  console.log(user);
  return (
    <>
    <TopBar />
   
   <Routes>
   
   <Route path="/" element={user ? <Home />: <Register />} />
   <Route path="write" element={user ? <Write />: <Register />} />
   <Route path="login" element={user ? <Home />: <Login />} />
   <Route path="register" element={user ? <Write />: <Register />} />
   <Route path="settings" element={user? <Settings />: <Register />} />
   <Route path="/post/:postId" element={<Single />} />
 
    </Routes>
    </>
  );
}

export default App;
