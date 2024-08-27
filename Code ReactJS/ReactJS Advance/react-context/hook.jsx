const themes = {
    light: { color: "black", backgroundColor: "white"},
    dark: { color: "white", backgroundColor: "black" }
}
const ThemeContext = React.createContext()
function ContextProviderClass(){
    return(
        <ThemeContext.Provider value={themes}>
            <ThemedButton />
        </ThemeContext.Provider>
    )
}
var objectStyle1 = null;
function ThemedButton(){
    const [isDark, setIsDark] = React.useState(true);
    const [objectStyle, setObjectStyle] = React.useState(null);
    const theme = React.useContext(ThemeContext)
    console.log(0);
    const changeMode = () => {
        if(isDark)
            setIsDark(false)
        else   
            setIsDark(true)
    }
    React.useEffect(()=>{
        setObjectStyle( isDark ? theme.dark : theme.light)
        objectStyle1 = isDark ? theme.dark : theme.light
    },[isDark])
    // Thay vì ấn nút thì set style luôn, ta lại đổi isDark và để useEffect bắt mà update color mọi nơi. Scope lớn nên nhét vào context và đổi trực tiếp
    return (
        <div>
            <button onClick={changeMode} style={objectStyle1}>Styling Button</button>
        </div>
    )
}
ReactDOM.render(<ContextProviderClass />, document.getElementById("2"));

var initialVal = 10;
function init(initialVal){ return {count: initialVal} }
function reducer(state,action){
    switch(action.type){
        case 'increasement':
            console.log(action.payload)
            return {count: state.count + 1}
        case 'decreasement':
            return {count: state.count - 1}
        default:
            throw new Error();
    }
}
function Counter(){
    const [state,dispatch] = React.useReducer(reducer,initialVal,init);
    return(
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({type: "increasement", payload: "Increase"})}>+</button>
            <button onClick={() => dispatch({type: "decreasement"})}>-</button>
        </div>
    )
}
ReactDOM.render(<Counter />, document.getElementById("3"))

function TestMemo(){
    const [stateTest,setStateTest] = React.useState(0);
    var check = React.useMemo(() => { // UseMemo ở đây chả khác gì useEffect
        return { 
            state1: stateTest,
        }
    },[stateTest])
    var functionCallback = React.useCallback(() => {
        console.log('Callback value: ' + check.state1)
    },[check])
    var funcEvent = () => {
        functionCallback();
        setStateTest(stateTest + 1)
    }
    return(
        <div>
            <div>Check: {check.state1}</div>
            <button onClick={funcEvent}>Change state</button>
        </div>
    )
}
ReactDOM.render(<TestMemo/>, document.getElementById("4"))

// Dùng useImperativeHandle
function RefNotForward(props,ref) {
    const inputRef = React.useRef()
    React.useImperativeHandle(ref, () => ({ // ref trở thành global sử dụng đc mọi hàm bên trong
        testFunction: () => {
            inputRef.current.focus()
            console.log("Thực hiện gì đó ở con")
        }
    }))
    return (
        <input ref={inputRef}/>
    )
}
const TestRefHandler = React.forwardRef(RefNotForward)
var TestRef = React.forwardRef((props,ref) => { // Chuyển tiếp cái ref của cha sang cho 1 component mới 
    return (
        <div>
            <div ref={ref.ref1}>Content of ref 1</div>
            <div ref={ref.ref2}>Content of ref 2</div>
        </div>
    )
})
function RefClass(){
    const ref = React.useRef();
    const ref1 = React.useRef()
    const ref2 = React.useRef()
    var eventHandler = () => {
        console.log(ref1.current.innerText);
        console.log(ref2.current.innerText);
        ref.current.testFunction();
    }
    return(
        <div>
            <TestRefHandler ref={ref}/>
            <TestRef ref={{ref1: ref1, ref2: ref2}}/>
            <button onClick={eventHandler}>Click</button>
        </div>
    )
}
ReactDOM.render(<RefClass/>, document.getElementById("6"));

// Dùng useLayoutEffect
var count = 0;
function ChangeCountClass(){
    const [test1,setTest1] = React.useState(true)
    React.useLayoutEffect(() => { 
        console.log("run effect");
        ++count;
        console.log(count)
    }, [test1])
    console.log("Run function")
    return (
        <div>
            {count}
            <button onClick={() => setTest1(test1 ? false : true)}>TEST 1</button>
        </div>
    )
}
ReactDOM.render(<ChangeCountClass/>, document.getElementById("7"))

// Cha chứa Con nhưng Con lớn nên chỉ muốn render lại khi cần thiét
var Con1 = React.memo(props => {
    return (
        <div name={console.log("Render Con1")}>
            Con1
        </div>
    )
})
function Cha1(){
    const [count, setCount] = React.useState(0)
    return (
        <div name={console.log("Render Cha1")}>
            <Con1 />
            <button onClick={() => setCount(count + 1)}>Cha1</button>
        </div>
    )
    // memo có tham số 2 trống, tham số 1 props k đổi thì k chạy lại hàm để render lại Con
}
ReactDOM.render(<Cha1/>, document.getElementById("8"))

// useMemo có thể thay thế memo
var Con2 = props => {
    return React.useMemo(() => {
        return (
            <div name={console.log("Render Con2")}>
                Con2
            </div>
    )},[])
}
function Cha2(){
    const [count, setCount] = React.useState(0)
    return (
        <div name={console.log("Render Cha2")}>
            <Con2 />
            <button onClick={() => setCount(count + 1)}>Cha1</button>
        </div>
    )
}
ReactDOM.render(<Cha2/>, document.getElementById("9"));