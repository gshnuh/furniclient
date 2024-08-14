


function Sidebar() {

    return (
        <>
            <nav className="navbar">
                <div className="container-fluid pt-5">
                    <a className="navbar-brand sidebar" href="/dashboard">Dashboard</a>
                </div>
            </nav>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand sidebar" href="/adminprofile">Profile</a>
                </div>
            </nav>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand sidebar" href="/userlist">User List</a>
                </div>
            </nav>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand sidebar" href="/adminlist">Admin List</a>
                </div>
            </nav>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand sidebar" href="/category">Category List</a>
                </div>
            </nav>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand sidebar" href="/taglist">Tag List</a>
                </div>
            </nav>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand sidebar" href="/product">Product Management</a>
                </div>
            </nav>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand sidebar" href="/coupon">Coupon Management</a>
                </div>
            </nav>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand sidebar" href="/order">Order Management</a>
                </div>
            </nav>
        </>
    );
}

export default Sidebar;