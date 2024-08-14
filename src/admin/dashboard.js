
import Footerbar from "./footerbar";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

function Dashboard() {


    return (
        <>
            <div className="container-fluid admindiv">
                <Navbar />
                <div className="row adrow">
                    <div className="col-md-2 pbtm nvbr">
                        <Sidebar />
                    </div>
                    <div className="col-md-10 tablecol">
                        <div className="row p-3">
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 footerdv"></div>
                    <div className="col-md-10 footerbar">
                        <Footerbar />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
