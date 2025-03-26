// VD vấn đề rerender
const Context1x = React.createContext({
    nickname: "",
    username: "", 
    movies: []
})
function Header2() {
    const {nickname, setNickname} = React.useContext(Context1);
    console.log("Header");
    return(
        <div>
            {nickname}
            <button onClick={() => setNickname("Hello")}>Test</button>
        </div>
    )
}
function Movies2() {
    const { movies } = React.useContext(Context1);
    console.log("Movies");
    return(
        <ul ref={console.log("Movies")}>
            {movies.map(item => (
                <li>{item}</li>
            ))}
        </ul>
    )
}
function A1() {
    const [nickname, setNickname] = React.useState("Hieu");
    const [movies] = React.useState([
        "Phim 1",
        "Phim 2"
    ])
    const [time, setTime] = React.useState(1);
    const value = { nickname, setNickname, movies };
    // const value = React.useMemo(() => {
    //     console.log("Akj");
    //     return {nickname, setNickname, movies }
    // },[nickname, movies]);
    console.log("render A1");
    return(
        <div>
            <Context1x.Provider value={value}>
                <Header2/>
                <Movies2/>
            </Context1x.Provider>
            <button onClick={() => setTime(time + 1)}>Test1</button>
        </div>
    )
}
ReactDOM.render(<A1/>, document.getElementById("01"));
// Ấn Test1 và tăng lên 1 thì A1 render lại dẫn đến Header và Movies render lại giảm performance. Biến value cũng được tạo lại liên tục. Dù ta dùng useMemo làm cho biến value không còn được tạo lại liên tục nhưng A1 vẫn render lại kéo theo header và movies cũng v.
// Fix bằng cách dùng memo cho component: 
const Context1y = React.createContext({
    nickname: "",
    username: "",
    movies: []
})
const Header3 = React.memo(() => {
    const {nickname, setNickname} = React.useContext(Context1);
    console.log("Header");
    return(
        <div>
            {nickname}
            <button onClick={() => setNickname("Hello")}>Test</button>
        </div>
    )
})
const Movies3 = React.memo(() => {
    const { movies } = React.useContext(Context1);
    console.log("Movies");
    return(
        <ul>
            {movies.map(item => (
                <li>{item}</li>
            ))}
        </ul>
    )
})
function A1() {
    const [nickname, setNickname] = React.useState("Hieu");
    const [movies] = React.useState([
        "Phim 1",
        "Phim 2"
    ])
    const [time, setTime] = React.useState(1);
    const value = React.useMemo(() => {
        console.log("Akj");
        return {nickname, setNickname, movies }
    },[nickname, movies]);
    console.log("render A1");
    return(
        <div>
            <Context1y.Provider value={value}>
                <Header3/>
                <Movies3/>
            </Context1y.Provider>
            <button onClick={() => setTime(time + 1)}>Test1</button>
        </div>
    )
}
ReactDOM.render(<A1/>, document.getElementById("0"));

// Vẫn mắc lỗi là nickname đổi thì movies cũng render lại (do dùng context) trong khi ta chỉ muốn movies render lại khi movie đổi thôi
// C1: chia nhiều context riêng. C2: dùng useMemo truyền dependencies chuẩn là được.
const Context1 = React.createContext({
    nickname: ""
})
const Context2 = React.createContext({
    movies: []
})
const Header = React.memo(() => {
    const {nickname, setNickname} = React.useContext(Context1);
    console.log("Header");
    return(
        <div>
            {nickname}
            <button onClick={() => setNickname("Hello")}>Test</button>
        </div>
    )
})
const Movies = React.memo(() => {
    const movies = React.useContext(Context2);
    console.log("Movies");
    return(
        <ul>
            {movies.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    )
})
function A1() {
    const [nickname, setNickname] = React.useState("Hieu");
    const [movies] = React.useState([
        "Phim 1",
        "Phim 2"
    ])
    const [time, setTime] = React.useState(1);
    const value = React.useMemo(() => {
        return {nickname, setNickname }
    },[nickname]);
    console.log("render A1");
    return(
        <div>
            <Context1.Provider value={value}>
                <Header/>
            </Context1.Provider>
            <Context2.Provider value={movies}>
                <Movies/>
            </Context2.Provider>
            <button onClick={() => setTime(time + 1)}>Test1</button>
        </div>
    )
}
ReactDOM.render(<A1/>, document.getElementById("0"));
