class ClassRedux extends React.Component{
    constructor(props){
        super(props);
        this.bindAction = Redux.bindActionCreators(this.props.onAddNumber,this.props.dispatch);
    }
    handleEvent = (number) => {
        this.bindAction(number);
    }
    handleEvent1 = (number) => {
        this.props.onAddNumber1(number);
    }
    render(){
        var number = this.props.number;
        return(
            <div>
                <h3>Number: {number} </h3>
                <button onClick={this.handleEvent.bind(null, number)}>Increase number</button>
                <button onClick={this.handleEvent1.bind(null, number)}>Increase number</button>
            </div>
        )
    }
}
const reducer = (state = {number: 2}, action) => {
    console.log("Type: ", action.type);
    console.log("reducer is working with state: ", state.number);
    var res = state.number;
    switch(action.type){
        case "ADD_NUMBER":
            res = action.number + 1;
    }
    console.log("reducer is working with state: ", res);
    return {number: res};
}
const reducer1 = (state = {number: 2}, action) => {
    console.log("reducer1 is working with state: ", state.number);
    var res = state.number;
    switch(action.type){
        case "ADD_NUMBER1":
            res = action.number + 1;
            break;
    }
    console.log("reducer1 is working with state: ", res);
    return {number: res};
}
var reducerAll = Redux.combineReducers({
    reducer, reducer1
})
var mapStateToProps = (state, ownProps) => {
    return state.reducer;
}
var addNumber = number => ({
    type: "ADD_NUMBER",
    number: number
})
var addNumber1 = number => ({
    type: "ADD_NUMBER1",
    number: number
})
var mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddNumber: (number) => { dispatch(addNumber(number)) },
        onAddNumber1: (number) => { dispatch(addNumber1(number)) }
    }
}
var logger = (temp) => {
    var { getState } = temp;
    return next => action => {
        next(action);
        console.log(getState());
    }
} 
var middleware = Redux.applyMiddleware(logger);
var store = Redux.createStore(reducerAll, { reducer: {number: 0} }, Redux.compose(middleware));
var mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, stateProps, dispatchProps, ownProps);
}
const ReduxComp = ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(ClassRedux);
ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <ReduxComp ownProps="Hello"/>
    </ReactRedux.Provider>,
    document.getElementById("eighth")
);
store.dispatch({type: "INIT", number: 0});
