import React from "react";
import {BrowserRouter, Link, Routes, Route, Outlet, useParams, useLocation, useNavigate, Navigate} from "react-router-dom";

const Home = ({test}) => {
    console.log(test); 
    let location = useLocation();
    console.log(location);

    let navigate = useNavigate();
    function handleClick(){
        navigate("/users");
    }
    return(
        <div>
            <div onClick={handleClick}>Home</div>
            <button onClick={() => navigate(-2)}>
                Go 2 pages back
            </button>
            <button onClick={() => navigate(-1)}>Go back</button>
            <button onClick={() => navigate(1)}>
                Go forward
            </button>
            <button onClick={() => navigate(2)}>
                Go 2 pages forward
            </button>
        </div>
    )
}
function About() {
    let params = useParams();
    console.log(params)
    return (
        <div>About</div>
    )
}
function Test(){
    return (
        <div>Test</div>
    )
}
function Users() {
    return (
        <div>
            <nav>
                <Link to="me">My Profile</Link>
                {/* link có thể dùng .. or . để chỉ định hướng đi */}
            </nav>
            <Outlet/>
            {/* Outlet là children of component của component router này */}
        </div>
    );
}
const RouterAll2 = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={true ? <Navigate to={"/home"} replace/> : <Navigate to={"/users"} replace/>}/>
                <Route path="/home" element={(<Home test={true}/>)}/>
                <Route path="users" element={<Users />}>
                    <Route path="me" element={<Test />} />
                    <Route path=":id" element={<About />} />
                </Route>
                {/* v6 chơi nested route */}
            </Routes>
        </BrowserRouter>
    );
}

export default RouterAll2;