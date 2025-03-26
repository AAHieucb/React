class ComponentLifeCycle extends React.Component {
    constructor(props) {
        super(props);
        this.now = new Date();
        // Muốn dùng this trong các hàm thì phải bind
        this.state = {
            count: 1 + this.props.step,
            hasError: false,
            currentTime: this.now
        };
        console.log(`Constructor: state ${this.state} and props ${this.props}`);
        console.log(this.state); console.log(this.props);
    };

    static getDerivedStateFromProps = (nextprops, prevstate) => {
        console.log(`getDerivedStateFromProps: nextProps ${nextprops} and prevState ${prevstate}`);
        console.log(nextprops); console.log(prevstate);
        console.log(this);
        // Hàm nàyk truy cập đc this và k bind đc nên ta k dùng this để lấy state đc mà chỉ dùng đc đối sô nó truyền vào
        let max = 10;
        if(nextprops.step < max)
            console.log("Hello");
    }

    countFnc = () => {
        console.log("CountFunc");
        this.setState({
            count: this.state.count + 1,
        });
    };
    componentDidMount() {
        console.log("componentDidMount");
        this.counterID = setInterval(() => this.countFnc(), 1000);
        console.log(this);
    };

    shouldComponentUpdate(nextProps, nextState) { // Truy cập đc vào this
        console.log(`shouldComponentUpdate: nextProps ${nextProps} and nextState ${nextState}`);
        console.log(nextProps); console.log(nextState);
        console.log(this);
        return true;
    }

    // Tại thời điểm này ta nhìn thấy trên giao diện r nhưng mô hình DOM bên trong chưa cập nhập
    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log(`getSnapBeforeUpdate: prevProps ${prevProps} and prevState ${prevState}`);
        console.log(prevProps);console.log(prevState);
        console.log(this);
    }

    // Mô hình DOM đã cập nhập
    componentDidUpdate(prevProps, prevState) {
        console.log(`componentDidUpdate: prevProps ${prevProps} and prevState ${prevState}`);
        console.log(prevProps);console.log(prevState);
        console.log("After is this: ", this.props, ": ", this.state)
        if (this.state.count === 5) {
            ReactDOM.unmountComponentAtNode(document.getElementById('LifeCycleWithError'));
        }
        if(this.state.count === 10)
        {
            this.setState({
                count: this.state.count + 1,
                hasError: true
            })
        }
        if(this.state.hasError){
            clearInterval(this.counterID);
        }
    };
    
    componentWillUnmount() { // Truy cập đc vào this
        console.log("componentWillUnmount");
        clearInterval(this.counterID);
        console.log(this);
    };

    render() {
        console.log("Render: ", this.state.count)
        if(this.state.hasError)
            return (
                <h1>Something wrong</h1>
            )
        else
            return (
                <h2>{this.state.count}</h2>
        )
    };
};
ComponentLifeCycle.defaultProps = {
    step: 2
}
ReactDOM.render( <ComponentLifeCycle />, document.getElementById('LifeCycleWithError') );