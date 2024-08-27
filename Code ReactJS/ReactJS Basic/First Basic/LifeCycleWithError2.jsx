class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
        console.log("Error: ", error);
        console.log("ErrorInfo: ", errorInfo);
        this.setState({
            error: error, 
            errorInfo: errorInfo
        })
    } // componentDidCatch có error throw ra và info là 1 object có 1 key là componentStack chứa thông tin về component phát ra cái error đó
    
    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        <summary>Mặc định k có summary là Details</summary>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        return this.props.children;
    }  
}

class ComponentLifeCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.step,
        };
    };

    static getDerivedStateFromProps(nextprops, prevstate){
        console.log("getDerivedStateFromProps");
        let max = 10;
        if(nextprops.step < max)
            console.log("Props: ", nextprops, " ;State: ", prevstate);
    }

    componentDidMount() {
        console.log("componentDidMount");
    };

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate");
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log("getSnapBeforeUpdate");
        console.log("prevProps: ", prevProps, " ;prevState: ", prevState);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
        console.log("Prev: ", prevProps, ": ", prevState)
        console.log("After: ", this.props, ": ", this.state)
        if (this.state.count === 10) {
            ReactDOM.unmountComponentAtNode(document.getElementById('componentLifeCycle'));
        }
    };
    
    componentWillUnmount() {
        console.log("componentWillUnmount");
    };

    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        if(this.state.count === 5){
            throw new Error('Crash!');
        }
        return <h1 onClick={this.handleClick}>{this.state.count}</h1>;
    };
};
ComponentLifeCycle.defaultProps = {
    step: 2
}

function App() {
    return (
        <div>
            <ErrorBoundary>
                <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
                <ComponentLifeCycle />
                <ComponentLifeCycle />
            </ErrorBoundary>
            <hr />
            <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
            <ErrorBoundary><ComponentLifeCycle /></ErrorBoundary>
            <ErrorBoundary><ComponentLifeCycle /></ErrorBoundary>
        </div>
    );
}

ReactDOM.render( <App />, document.getElementById('LifeCycleWithError') );