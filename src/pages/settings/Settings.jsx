import "./settings.css";
import Sidebar from "../../sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

const Settings = () => {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, dispatch } = useContext(Context);
    const [success, setSuccess] = useState(false);
    const PF = "http://localhost:5000/images/";


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "UPDATE_START"});
        const updatedUser = {
            userId: user._id,
            username, email, password
        };

        if(file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.photo = filename;

            try{
                await axios.post("/upload", data);
                
            } catch(err) {
                console.log(err)
            }
        }

        try {
          const res =  await axios.put(`/users/${user._id}`, updatedUser);
           setSuccess(true);
           dispatch({type: "UPDATE_SUCCESS", payload: res.data});
        } catch(err) {
            console.log(err);
            dispatch({type: "UPDATE_FAILURE"});

        }

    };
    return (
        <div className="container">

            <div className="row mt-4 mb-4">
                <div className="col-md-4">
                    <h4 className="settings-header-font">Update your account</h4>
                </div>

                <div className="col-md-4">
                    <h6 className="text-danger float-right settings-header-font cursor-pointer"><i className="fa fa-trash" aria-hidden="true"></i> Delete Account</h6>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <h5 className="settings-header-font">Profile Picture</h5>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">

                    <form onSubmit={handleSubmit}>

                        <div className="form-group row mt-3">
                            <div className="media align-items-center py-3 col-4">
                                <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" className="d-block rounded-circle profile-size" />
                                <div className="media-body ml-4">
                                    <label htmlFor="fileInput" className="col-form-label">
                                        <i className="fa settings-icon-size fa-user-circle-o text-secondary cursor-pointer" aria-hidden="true"></i>
                                    </label>

                                    <div className="">
                                        <input type="file" className="form-control-file d-none" id="fileInput" onChange={e=>setFile(e.target.files[0])} />
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="form-group row mb-5">
                            {/* <div class="col-sm-12">
                                <label for="username">Username</label>
                            </div> */}

                            <div className="col-sm-8">
                                <input type="text" 
                                className="form-control shadow-none border-top-0 border-right-0 border-left-0 settings-form-font" 
                                id="username" 
                                placeholder={user.username}
                                onChange={e=> setUsername(e.target.value) }
                                />
                            </div>

                        </div>

                        <div className="form-group row mb-5">
                            {/* <div className="col-sm-12">
                                <label for="username">Username</label>
                            </div> */}

                            <div className="col-sm-8">
                                <input type="email" 
                                className="form-control shadow-none border-top-0 border-right-0 border-left-0 settings-form-font" 
                                id="email" 
                                placeholder={user.email}
                                onChange={e => setEmail(e.target.value) }
                                />
                            </div>

                        </div>

                        <div className="form-group row">
                            {/* <div className="col-sm-12">
                                <label for="username">Username</label>
                            </div> */}

                            <div className="col-sm-8">
                                <input type="password" 
                                className="form-control shadow-none border-top-0 border-right-0 border-left-0 settings-form-font" 
                                id="password" 
                                placeholder="Password"
                                onChange={e=>setPassword(e.target.value)}
                                />
                            </div>

                        </div>
                        
                        <button type="submit" className="btn btn-danger px-3 settings-form-font mt-5 mb-5">Update</button>

                    </form>

                    {
                        success && <span className="text-success">Profile updated successful!</span>
                    }

                </div>

                <div className="col-md-4 col-sm-12 col-xs-12 center-card">
                    <Sidebar />
                </div>

            </div>

        </div>
    );
}

export default Settings;
