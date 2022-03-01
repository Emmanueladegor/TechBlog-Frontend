import "./login.css";
import { Link } from "react-router-dom";
import {Context} from "../../context/Context";
import { useRef,useContext } from "react";
import axios from "axios";

const Login = () => {

    const userRef = useRef();
    const passwordRef = useRef();
    const {dispatch, isFetching} = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});

        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            });
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
        
        } catch(err) {
            dispatch({type: "LOGIN_FAILURE"});
        }
    }

    return (
        <div className="container-fluid">
        <div className="row no-gutter">
            <div className="col-md-6 d-none d-md-flex login-bg-image"></div>
            <div className="col-md-6 bg-light">
                <div className="login d-flex align-items-center py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-xl-6 mx-auto">
                            <h2 className="d-flex justify-content-center">LOGIN</h2> <br />
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-3"> 
                                        <input 
                                        id="inputUsername" 
                                        type="username" 
                                        placeholder="username"
                                        autoFocus={true}
                                        className="form-control rounded-pill border-0 shadow-sm px-4"
                                        ref={userRef}
                                        />
                                    </div>

                                    <div className="form-group mb-3"> 
                                    <input 
                                    id="inputPassword"
                                    type="password" 
                                    placeholder="Password" 
                                    className="form-control rounded-pill border-0 shadow-sm px-4 text-danger" 
                                    ref={passwordRef}
                                    /><br /> 
                                    </div>
                                     
                                     <button 
                                     type="submit" 
                                     className="btn btn-danger 
                                     btn-block text-uppercase mb-2 rounded-pill shadow-sm">
                                         Sign in
                                    </button>

                                    <div className="text-center d-flex justify-content-between mt-4">
                                    <p> OR &nbsp; <Link to="/register">Create Account</Link> </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Login;