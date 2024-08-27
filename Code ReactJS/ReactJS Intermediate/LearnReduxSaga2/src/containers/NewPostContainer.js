import { addPost } from "../actions/index.js";
import NewPost from "../components/NewPost.js";
import { connect } from "react-redux"

var mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (text) => dispatch(addPost(text)),
    }
}

export default connect(null, mapDispatchToProps)(NewPost)