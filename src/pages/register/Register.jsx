import "./register.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);

        try{
            const res = await axios.post("/auth/register",{
                username,
                email,
                password
            });

            res.data && window.location.replace("/login");

        } catch(err){
            setError(true);
        }
 
    }

    return (
        <div className="container-fluid">
            <div className="row no-gutter">
                <div className="col-md-6 d-none d-md-flex register-bg-image"></div>
                <div className="col-md-6 bg-light">
                    <div className="register d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 col-xl-6 mx-auto">
                                    <h2 className="d-flex justify-content-center">REGISTER</h2> <br />
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group mb-3">

                                            <input
                                                id="inputUsername"
                                                type="text"
                                                placeholder="Username"
                                                className="form-control rounded-pill border-0 shadow-sm px-4"
                                                onChange={e => setUsername(e.target.value)}
                                            />
                                        </div>


                                        <div className="form-group mb-3">
                                            <input
                                                id="inputEmail"
                                                type="email"
                                                placeholder="Email address"
                                                className="form-control rounded-pill border-0 shadow-sm px-4"
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group mb-3">
                                             <input 
                                             id="inputPassword" 
                                             type="password" 
                                             placeholder="Password" 
                                             className="form-control rounded-pill border-0 shadow-sm px-4 text-danger" 
                                             onChange={e => setPassword(e.target.value)}
                                             /><br /> 
                                        </div>

                                        <button type="submit" className="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm">Register</button>
                                        <div className="text-center d-flex justify-content-between mt-4">
                                            <p> OR &nbsp; <Link to="/login">Sign In</Link> </p>
                                        </div>

                                        <div className="form-group mt-3">
                                           {error && <p className="text-danger text-center">Something went wrong</p>}
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

export default Register;