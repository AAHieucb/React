class TestChangeDOM extends React.Component{
    constructor(props){
        super(props);
        this.ref = React.createRef();
    }
    logOut1(event) {
        console.log(event.target.innerText);
    }
    logOut2 = event => {
        console.log(this.ref.current.innerText);
    }
    logOut3 = () => {
        console.log(document.getElementById("2").innerText); // Dùng DOM của JS trong mọi hàm của React thoải mái
    }
    logOut4 = () => {
        console.log(ReactDOM.findDOMNode(document.getElementById("2")).innerText);
    }
    render(){
        return (
            <div>
                <div ref={this.ref} id="2">Hello</div>
                <button onClick={event => this.logOut1(event)}>Click to log1</button>
                <button onClick={event => this.logOut2(event)}>Click to log2</button>
                <button onClick={event => this.logOut3(event)}>Click to log3</button>
                <button onClick={event => this.logOut4(event)}>Click to log4</button>
            </div>
        )
    }
}
ReactDOM.render(<TestChangeDOM/>,document.getElementById("1"));

class Movie extends React.Component{
    render(){
        return (
            <div style={(this.props.active) ? {color: "red"} : {color: "black"}}>{this.props.children}</div>
        )
    }
}
class Pane extends React.Component{
    render(){
        return (
            <Movie active={this.props.active}>
                <div>
                    <div>Title {this.props.number}</div>
                    <div>Content Movie {this.props.number}</div>
                </div>
            </Movie>
        )
    }
}
class Content extends React.Component{
    render(){
        return (
            <MovieBrowser>
                <Pane number={1}></Pane>
                <Pane number={2}></Pane>
            </MovieBrowser>
        )
    }
}
class MovieBrowser extends React.Component{
    constructor(props){
        super(props);
        this.state={
            active: [true, false],
        }
    }
    handleEvent = () => {
        this.setState((prevState, props) => {
            for(var i = 0; i < this.state.active.length; i++)
                if(this.state.active[i])
                    this.state.active[i] = false;
                else
                    this.state.active[i] = true;
        })
        this.forceUpdate();
    }
    render(){
        const children = React.Children.map(this.props.children, (child,index) => {
            if(child.props.number == 1 || child.props.number == 2)
                if (React.isValidElement(child)) {
                    return <div>{React.cloneElement(child, { active: this.state.active[index] })}</div>
                }
        })
        return(
            <div>
                {children}
                <button onClick={this.handleEvent}>Switch</button>    
            </div>
        )
    }
}
ReactDOM.render(<Content />, document.getElementById("7"));
