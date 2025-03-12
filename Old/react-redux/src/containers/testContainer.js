import Test from "../components/test.js";
import { connect } from "react-redux";
import { addNumber } from "../actions/index";

const mapStateToProps = (state, ownProps) => {
    console.log("5")
    var res2 = { number: state.reducer[0].number += parseInt((ownProps.age)) }
    console.log(`Fifth: hàm mapStateToProps gắn với object đó sẽ bắt state mới từ reducer ${state.reducer} kết hợp với 
    ownProps ${ownProps} để tạo ra 1 props cuối cùng mới cho component ${res2}`);
    console.log(state.reducer); console.log(ownProps); console.log(res2);
    return res2;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddNumber: (number) => {
            console.log(`Second: hàm số này gọi đến hàm addNumber với cái đối sô kia`);
            dispatch(addNumber(number)); 
            console.log("Third: sau khi có actions nó dispatch action đó=>chưa kịp kết thúc hàm tức là \
            đang dispatch dở thì reducer bắt và làm luôn nên cả quá trình coi như hàm onAddNumber còn chưa kết thúc")
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);
