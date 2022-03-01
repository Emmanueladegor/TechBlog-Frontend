import Sidebar from "../../sidebar/Sidebar";
import SinglePost from "../../singlePost/SinglePost";


const Single = () => {
  return (
    <div className="container">

    <div className="row mt-4">
            <div className="col-md-8 col-sm-12 col-xs-12">
            <SinglePost />
            </div>

            <div className="col-md-4 col-sm-12 col-xs-12 center-card">
            <Sidebar />
            </div>
            
     </div>
    </div>
  );
}

export default Single;