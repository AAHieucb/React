function getInitialVal(){
    return {count: 0};
}
function reducer(state, action){
    switch(action.type){
        case "ADD": 
            return {
                ...state, 
                count: ++state.count
            };
        case "DEC":
            return {count: --state.count};
        default:
            throw new Error("Wrong Type of Action"); // or cứ return state; là được
    }
}
var TestReducerHook = () => {
    const [state, dispatch] = React.useReducer(reducer, undefined, getInitialVal);
    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({type: "ADD"})}>+</button>
            <button onClick={() => dispatch({type: "DEC"})}>-</button>
        </div>
    )
}
ReactDOM.render(<TestReducerHook />, document.getElementById("hook3"));

const Con = props => {
    console.log("Chạy hàm con");
    return React.useMemo(() => {
        return (
            <div name={console.log("Con")}>Hello</div>
        );
    },[]);
};
function Cha(){
    const [counter,setCounter] = React.useState(2);
    return <div name={console.log("Cha")}>
        <Con />
        <button onClick={() => setCounter(counter + 1)}>Click</button>
    </div>
}
ReactDOM.render(<Cha />, document.getElementById("hook7"));

// useRef tới component con
function TestUseRefChild(props) {
    return (
        <div>
            <div ref={props.id}>{props.children}Hello</div>
        </div>
    )
}
function TestUseRefParent() {
    var testRef = React.useRef();
    return (
        <div>
            <TestUseRefChild id={testRef}>Parent </TestUseRefChild>
            <button onClick={() => testRef.current.innerText = "World"}>CLick</button>
        </div>
    )
} 
ReactDOM.render(<TestUseRefParent />, document.getElementById("hook5"));

// 1 cha ref tới nhiều component con với forwardRef
function TestRef(props, ref) {
    const ref1 = React.useRef("value");
    console.log(ref1.current);
    const ref2 = React.useRef();
    const ref3 = React.useRef();
    React.useImperativeHandle(ref, () => ({
        changeColor: () => { 
            ref1.current.style.backgroundColor = props.color;
            ref2.current.style.backgroundColor = "yellow";
            ref3.current.style.backgroundColor = "green";
        }, // Chú ý phải là hàm số
        changeText: () => {
            ref1.current.innerText = "Changed Text 1";
            ref2.current.innerText = "Changed Text 2";
            ref3.current.innerText = "Changed Text 3";
        }
    }));
    return (
        <div>
            <div ref={ref1}>Text 1</div>
            <div ref={ref2}>Text 2</div>
            <div ref={ref3}>Text 3</div>
        </div>
    )
}
const FancyTestRef = React.forwardRef(TestRef); // forwardRef nhận component, trả ra component
function RigthWayUseRef() {
    const refTest = React.useRef();
    return (
        <div>
            <FancyTestRef ref={refTest} color={"red"}/>
            <button onClick={() => refTest.current.changeColor()}>Change Color</button>
            <button onClick={() => refTest.current.changeText()}>Change Text</button>
        </div>
    )
} 
function RigthWayUseRef2() {
    const refTest = React.useRef();
    return (
        <div>
            <FancyTestRef ref={refTest} color={"cyan"}/>
            <button onClick={() => refTest.current.changeColor()}>Change Color</button>
            <button onClick={() => refTest.current.changeText()}>Change Text</button>
        </div>
    )
} 
var Combination = () => {
    return (
        <div>
            <RigthWayUseRef />
            <RigthWayUseRef2 />
        </div>
    )
}
ReactDOM.render(<Combination />, document.getElementById("hook6"));

