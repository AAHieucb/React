import { ADD_POST, REMOVE_POST } from "../actions/const.js"
import uuidv4 from "uuid/v4"

var defaultPost = [
    { text: "Default title", id: uuidv4() }
]
export default (state = defaultPost, action) => {
    console.log(state)
    switch(action.type){
        case ADD_POST: 
            return [...state, ...[{ text: action.text, id: uuidv4() }]];
        case REMOVE_POST:
            return state.filter(item => (item.id != action.id) ? item : null);
        default:
            return state;
    }
}