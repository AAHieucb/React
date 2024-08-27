class ClassIndex2 extends React.Component {
    // K cần viết constructor nữa
    state = {
        name: "Bùi Văn Tèo",
        age: 25
    };
    handleClick() {
        console.log(this);
    }
    render() {
        return (
        <div>
            <h2>{this.state.name}</h2>
            <p>Tuổi: {this.state.age}</p>
        </div>
        );
    };
};
ReactDOM.render(
    <ClassIndex2 />,
    document.getElementById("newSyntax")
)


class Button extends React.Component {
    constructor(props) {
        // Hàm super(props) gọi constructor của React.Component, gọi xong mới dùng this đc. Bên dưới k gọi k dùng đc this
        super(props);
        this.state = {
            text: "Please Click me!",
            clickCount: 0,
            searchText: "",
            searchCount: 0,
        };
        this.changeSearchText2 = this.changeSearchText2.bind(this);
        // Sang bản ES6 thì class của react thì các hàm sẽ k còn tự động bind this nx (trừ arrow function) nên ta phải chủ động bind nó, ví dụ bind luôn ở constructor
    }
    updateCount() {
        this.setState((prevState, props) => {
            return {
                clickCount: prevState.clickCount + parseInt(props.step),
                text: "Clicked"
            };
        });
    }
    changeSearchText(event){ // this trong hàm này là window
        var v = event.target.value;
        this.setState((prevState, props) => {
            return {
                searchText: v,
                searchCount: ++prevState.searchCount
            }
            // Nếu dùng prevState.searchCount++ là sai vì nó lưu trước r mới cộng cái prev thì cái hiện tại có đc cộng đâu
        })
    }
    changeSearchText2(event){
        var v = event.target.value;
        this.setState((prevState, props) => {
            return {
                searchText: v,
                searchCount: ++prevState.searchCount
            }
        })
    }
    render() {
        return (
        <div>
            <button onClick={ () => this.updateCount() }>
                {this.state.text} : {this.state.clickCount}
            </button>
            <br />
            <input type="text" value={this.state.searchText} onChange={this.changeSearchText.bind(this)}/>
            <input type="text" value={this.state.searchText} onChange={this.changeSearchText2}
                placeholder="test bind this in constructor"/>
            <div>Search Text: {this.state.searchText}</div>
            <div>Search Count: {this.state.searchCount}</div>
        </div>
        );
    }
}
Button.defaultProps = {
    step: 2,
}
ReactDOM.render(<Button step='3' />, document.getElementById("button1"));