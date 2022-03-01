import { useState, useContext } from "react";
import "./write.css";
import { Context } from "../../context/Context";
import axios from "axios";


const Write = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context)


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc
        };

        if(file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;

            try{
                await axios.post("/upload", data);
            } catch(err) {
                console.log(err)
            }
        }

        try {
           const res =  await axios.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch(err) {
            console.log(err)
        }

    }

    return (
        <div className="container">
        <div className="row mt-4">
            <div className="col-md-12">
                {file && 
                <img src={URL.createObjectURL(file)} alt="" className="rounded-top img-fluid" />
                }
                
            </div>
        </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group row mt-5">
                    <label htmlFor="fileInput" className="col-sm-2 col-form-label">
                    <i className="fa fa-plus-circle text-secondary fa-2x cursorPointer float-right" aria-hidden="true"></i>
                    </label>
                    <div className="col-sm-10">
                    <input type="file" className="form-control-file d-none" id="fileInput" onChange={e=>setFile(e.target.files[0])} />
                    <input type="text" placeholder="Title" className="form-control write-font no-border shadow-none float-left" autoFocus={true} onChange={e=>setTitle(e.target.value)} />
                    </div>
                    
                </div>

                <div className="form-group row mt-5">
                <div className="col-sm-2">
                    </div>
                <div className="col-sm-10">
                <textarea className="form-control write-font no-border shadow-none" placeholder="Tell your story..." type="text"  onChange={e=>setDesc(e.target.value)}></textarea>
                </div>

                </div>

                <div className="form-group row mt-5">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                <button className="btn btn-danger px-3 write-btn-font">Publish</button>
                </div>

                </div>
            </form>

        </div>
    );
}

export default Write;