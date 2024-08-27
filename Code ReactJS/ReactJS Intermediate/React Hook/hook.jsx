// # Dùng HOC
const withSecretToLife = (WrappedComponent) => {
    class HOC extends React.Component {
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    secretThing={42}
                />
            );
        }
    }
    return HOC;
};
const DisplayTheSecret = props => (
    <div>
        The secret to life is {props.secretThing}.
    </div>
);
const WrappedComponent = withSecretToLife(DisplayTheSecret); // Ta dùng HOC tức là dùng 1 hàm số nhận 1 component và cho ra component cần dùng

function Example(props) { 
    const [count, setCount] = React.useState(0);
    const [fruit, setFruit] = React.useState('banana'); 
    const [todos, setTodos] = React.useState([{ text: 'Learn Hooks' }]);
    const [repos, setRepos] = React.useState([]); 
    const [loading, setLoading] = React.useState(false)
    const [isOnline, setIsOnline] = React.useState(null); 

    React.useEffect(() => {
        document.title = `You clicked ${count} times`;
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "GET"
        }).then((res) => { 
            setLoading(false); 
            return res.json()
        }).then(res=>console.log(res))
        Promise.resolve("10").then(res => console.log(res))
    },[]);

    console.log("6")
    React.useEffect(() => {
        console.log("7")
        document.title = `You clicked ${count} times`;
        console.log("9")
    });
    
    React.useEffect(() => {
        return console.log('Unmount!'); 
    });
    return (
        <div>
            <p rel={console.log(8)}>You clicked {count} times</p>
            <button onClick={() => {
                setCount(count + 1)
            }}>
                Click me
            </button>
            <br />
            {loading ? "loading" : "loaded"}
        </div>
    );
}
ReactDOM.render(<Example />, document.getElementById("hook1"));
// Xét lần render đầu tiên: gọi hàm chạy từ trên xuống -> 6 -> return xong mới thực hiện useEffect vì lần đầu tiên gọi sẽ gán các giá trị, gán giá trị tức có sự thay đổi nên gọi useEffect -> 7
// Đáng lẽ như thế là xong nhưng hàm useEffect fetchAPI lại setLoading thay đổi state 1 lần nx làm nó lại chạy lại hàm -> 6 -> useEffect bắt mọi thứ lại chạy tiếp -> 7 
// => 6767
