class EventForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: "",
            valueSelect: "javascript",
            valueCheck: true,
            valueArea: ""
        }
    }
    handleSubmitEvent = (e) => {
        alert("Send to server: " + this.state.value+" and " + this.state.valueCheck + " and " + this.state.valueArea)
        e.preventDefault();
    }
    handleChange = (e) => {
        var type = e.target.type;
        this.setState({
            // Nên dùng như này chung 1 biến thay vì tạo hàng loạt biến state
            [e.target.name]: (type == "check") ? e.target.checked : e.target.value
        })
    }
    handleSubmitSelect = (e) => {
        alert(`Send to server: ${this.state.valueSelect}`);
        e.preventDefault();
    }
    handleChangeSelect = (e) => {
        this.setState({
            valueSelect: e.target.value
        })
    }
    render(){
        return(
            <div>
                <form action="" onSubmit={this.handleSubmitEvent}>
                    <label>
                        Name:
                        <input type="text" onChange={this.handleChange} value={this.state.value} name="value" />
                    </label>
                    <label>
                        Test nhiều loại input khác nhau:
                        <input type="checkbox" checked={this.state.valueCheck} onChange={this.handleChange}
                        name="valueCheck" />
                    </label>
                    <label>
                        <textarea name="valueArea" cols="30" rows="10" value={this.state.valueArea} required
                        onChange={this.handleChange}></textarea>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                <form action="" onSubmit={this.handleSubmitSelect}>
                    <label>
                        Chọn khóa học: 
                        <select value={this.state.valueSelect} onChange={this.handleChangeSelect}>
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="javascript">JAVASCRIPT</option>
                            <option value="react.js">REACT.JS</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
ReactDOM.render( <EventForm />, document.getElementById('event') )