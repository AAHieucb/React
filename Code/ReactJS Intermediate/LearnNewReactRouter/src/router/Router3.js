import React from "react";
import { BrowserRouter, Link, Routes, Route, Outlet, useParams, useLocation, useNavigate, Navigate } 
    from "react-router-dom";
import auth from "./auth.js";
const LazyTest = React.lazy(() => import('./Test.js'));

const Home = () => {
    console.log("Home")
    let navigate = useNavigate();
    function handleClick(){
        navigate("/users");
    }
    function login(){
        auth.login(null);
    }
    return(
        <div>
            <div onClick={handleClick}>Access to User</div>
            <div onClick={login}>Login</div>
        </div>
    )
}
function About() {
    return (
        <div>About</div>
    )
}
function Users(props) {
    return (
        <div>
            <nav>
                <Link to="me">My Profile: {props.color}</Link>
            </nav>
            
            {/* Có thể viết nested route ở đây or dùng Outlet thay thế cho mọi nested route của route này */}
            <Outlet/>
        </div>
    );
}

function CheckForRender({properties}){
    return (
        <div>
            {auth.isAuthenticated() ? properties.Comp : <Navigate to={properties.path}/>}
        </div>
    )
}

const PrivateRoutes = () => {
    return auth.isAuthenticated() ? <Outlet /> : <Navigate to='/' />
}

const RouterAll3 = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={"/home"} replace/>}/>
                <Route path="/home" element={(<Home />)}/>
                {/* <Route path="/users" element={auth.isAuthenticated() 
                    ? <Users name={console.log("user")} /> 
                    : <Navigate to={"/home"} replace name={console.log("Home nef")}/>}> 
                    Dùng như này là sai vì Route nó tính toán luôn tại thời điểm này để biết render ra component nào chứ k chạy lại đâu nên tốt hơn là render ra 1 component và check trong component đó thì mỗi lần chạy route sẽ gọi lại component đó chứ nó k chạy lại logic trong thuộc tính element*/}
                {/* <Route path="/users" element={<Users />}> */}
                {/* <Route path="/users" element={<CheckForRender properties={{
                    path: "/",
                    Comp: <Users color="red"/>
                }} />}>
                    <Route path="me" element={<Test />} />
                    <Route path=":id" element={<About />} />
                </Route> */}
                {/* Khi vào /users sẽ vào Users chứ k vào Test và About. Khi vào /users/me sẽ vào Users có 1 con là Test
                => nếu ta muốn có 1 component con mặc định khi vào /users k thôi cơ thì thêm từ khóa index. VD:
                <Route path="/users" element={<CheckForRender properties={{
                    path: "/",
                    Comp: <Users color="red"/>
                }} />}>
                    <Route index element={<Hello />} />
                    <Route path="me" element={<Test />} />
                    <Route path=":id" element={<About />} />
                </Route>
                */}

                {/* Thường thì chỉ cần check login 1 lần trong ứng dụng nên có thể viết gọn là: */}
                <Route element={<PrivateRoutes/>}>
                    <Route path="/users" element={<Users color="red"/>}>
                        <Route path="me" element={
                            // Kết hợp lazy loading, ở đây file Test.js chỉ được load khi thực sự chạy vào đây và cần render ra component Test
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <LazyTest />
                            </React.Suspense>
                        } />
                        <Route path=":id" element={<About />} />
                    </Route>
                </Route>
                {/* Rất đơn giản, chỉ cần bao mọi Route vào trong Route dùng PrivateRoutes như này */}

            </Routes>
        </BrowserRouter>
    );
}
export default RouterAll3;