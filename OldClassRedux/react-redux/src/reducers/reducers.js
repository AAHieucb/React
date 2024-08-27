import { EVENT1 } from "../actions/const.js"

var post = [{number: 1}]
const reducer = (state = post, action) =>{
    let copyState = state[0].number;
    switch(action.type){
        case EVENT1: 
            copyState += 1;
            break;
    }
    var res = [{number: copyState}]
    console.log(res)
    console.log("1", [{number: copyState}])
    console.log(`Fourth: reducer sẽ bắt được và dùng state ${state} và action ${action} để tạo ra state mới ${res}`);
    console.log(state); console.log(action); console.log(res); console.log(copyState);
    return res;
}

export default reducer;