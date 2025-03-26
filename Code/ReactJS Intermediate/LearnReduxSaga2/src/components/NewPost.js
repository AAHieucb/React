import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

class NewPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.title){
            this.props.onSubmit(this.state.title);
        }
        this.setState({
            title: ""
        })
    }
    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    render(){
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <div className="d-flex my-2">
                        <input className="form-control d-inline-flex w-75" type="text" placeholder="Title..."
                            value={ this.state.title } onChange={ this.handleChange }/>
                        <button className="btn btn-outline-primary" type="submit">Add Post</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default NewPost;