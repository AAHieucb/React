import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CustomRouter from "./CustomRouter.js";
import history from "./history.js";

// Tạo listen cho url khi bị thay đổi ở v6 phức tạp
const Home = () => {
    const navigate = useNavigate();
    return(
        <div>
            <div>Home Page</div>
            <button onClick={() => navigate("/user")}>Click</button>
        </div>
    )
}
const User = () => {
    return(
        <div>User Page</div>
    )
}

const RouterAll4 = () => {
    useEffect(() => {
        const unlisten = history.listen((location, action) => { // listen ở đây thừa
            console.log("Catch url changing");
            console.log(location, action);
        });
        return unlisten;
    },[]);
    return (
        <CustomRouter history={history}>
            <Routes>
                <Route path={"/user"} element={<User/>} />
                <Route path={"/"} element={<Home/>} />
            </Routes>
        </CustomRouter>
    )
}
export default RouterAll4;