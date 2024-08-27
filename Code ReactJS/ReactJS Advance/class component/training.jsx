class Class1 extends React.Component{
    constructor(props){
        super(props);
        this.ref = React.createRef();
    }
    showRandomNum = () => {
        this.forceUpdate(); // Ra khỏi hàm mới chạy forceUpdate
        var randomVal = this.ref.current.innerText.split(" ")[2];
        console.log(randomVal);
    }
    render() {
        return(
            <div>
                <div ref={this.ref}>Random Number: {Math.random()}</div>
                <button onClick={this.showRandomNum}>Show random number</button>
            </div>
        )
    }
}
ReactDOM.render(<Class1 />, document.getElementById("first"));

class Class3 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputText: "",
            inputTextArea: "",
            inputSelect: "cat",
            inputCheckBox: true
        }
    }
    handleInputText = (e) => {
        this.setState({
            [e.target.name]: (e.target.type == "checkbox") ? e.target.checked : e.target.value
        })
        console.log("here1")
    }
    handleSubmitEvent = (e) => {
        console.log("here");
        alert("Send " + this.state.inputText + " " + this.state.inputTextArea + " " + 
        this.state.inputSelect + " " + this.state.inputCheckBox);
        e.preventDefault();//vẫn gửi thực hiện gửi dữ liệu qua server nhưng tên url k đổi
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmitEvent}>
                    <input type="text" name="inputText" onChange={this.handleInputText} value={this.state.inputText}/>
                    <br />
                    <textarea cols="30" rows="10" name="inputTextArea" onChange={this.handleInputText}
                    value={this.state.inputTextArea}></textarea>
                    <br />
                    <select id="" name="inputSelect" onChange={this.handleInputText} 
                    value={this.state.inputSelect}>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                    </select>
                    <br />
                    <input type="checkbox" name="inputCheckBox" onChange={this.handleInputText} 
                    value={this.state.inputCheckBox}/>
                    <br />
                    <input type="submit" value="submit"/>
                </form>
            </div>
        )
    }
}
ReactDOM.render(<Class3 />, document.getElementById("third"))

class Class6 extends React.Component{
    render(){
        var nameTag = React.createElement("h2", { key: "3", className:"cssForThisTag" }, "Name:" + this.props.name)
        var ageAndJob = React.createElement("ul", { key: "4" }, [
            React.createElement("li", { key: "1" }, this.props.age),
            React.createElement("li", { key: "2" }, this.props.job)
        ]);
        var All = React.createElement("div", { id: "Person" }, [nameTag, ageAndJob]);
        return All;
    }
}
ReactDOM.render(<Class6 name="Hieu" age="19" job="IT" />, document.getElementById("fourth"))

class ErrorBoundary extends React.Component{
    constructor(props){
        super();
        this.state = {
            error: "",
            errorInfo: ""
        }
    }
    componentDidCatch(error, errorInfo){
        console.log("Error: ", error.toString());
        console.log("ErrorInfo: ", errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }
    render(){
        if(this.state.errorInfo)
            return(
                <div>
                    <details>
                        <summary>Error: {this.state.error && this.state.error.toString()}</summary>
                        <br />
                        <p>Info: {this.state.errorInfo.componentStack}</p>
                    </details>
                </div>
            )
        else
            return this.props.children;
    }
}
class LifeCycle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            number: 0,
            error: false
        }
        console.log("constructor");
    }
    static getDerivedStateFromProps(props, prevState){
        console.log("getDerivedStateFromProps");
        return null;
    }
    componentDidMount(){
        console.log("ComponentDidMount");
        this.setState({
            number: this.state.number + 1,
        })
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log("shouleComponentUpdate");
        return true;
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log("getSnapshotBeforeUpdate");
        return 1;
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        console.log("componentDidUpdate");
        if(this.state.error)
            ReactDOM.unmountComponentAtNode(document.getElementById("fifth"));
    }
    componentWillUnmount(){
        console.log("componentWillUnmount");
    }

    handleError = () => {
        console.log("Run");
        this.setState({
            error: true
        })
    }
    render() {
        console.log("render");
        if(this.state.error) 
            throw new Error("Error nè");
        return(
            <div>
                    <div>{this.state.number}</div>
                    <button onClick={this.handleError}>Click là error nhé</button>
            </div>
        )
    }
}
function Wrapper(props){
    return(
        <div>
            <ErrorBoundary>
                <LifeCycle />
            </ErrorBoundary>
        </div>
    )
}
ReactDOM.render(<Wrapper/>, document.getElementById("fifth"));
// Error Boundary + Class component life cycle

// createContext với class component
var varContext = React.createContext({name: "hieu"});
class Screen extends React.Component{
    render(){
        return (
            <div>
                Number: {this.context.number}
                <varContext.Consumer>
                    {({number})=>{
                        console.log(number);
                    }}
                </varContext.Consumer>
            </div>
        )
    }
}
Screen.contextType = varContext;
class Edit extends React.Component{
    render(){
        return(
            <varContext.Provider value={{number: 100}}>
                <Screen />
            </varContext.Provider>
        )
    }
}
ReactDOM.render(<Edit />, document.getElementById("sixth"));
