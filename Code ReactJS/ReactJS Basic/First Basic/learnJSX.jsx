// style của component
const cssProps = {
    color: 'red',
    border: '1px solid red',
    'font-size': '2rem',
};
var jsxObject1 = <div style={cssProps}> Thông báo khẩn! </div>
console.log(jsxObject1);

// Câu điều kiện trong JSX
var condition = 1;
var jsxObject2 = <div> { condition ? <strong>True</strong> : null } </div>

// Đk dùng kỹ thuật đoản mạch
var jsxObject3 = <div>{ !condition || <strong>True - Cách 2, chú ý dấu ! phủ định</strong> }</div>
// 1 trong 2 cái (!condition) và phần sau đúng or cái sau tồn tại(coi là true) thì lấy cái đằng sau. && là và cả 2
// VD jsxObject3 là thừa thãi khi mà ta biết chắc cái sau tồn tại thì dùng && mới có giá trị chứ thế này luôn đúng
// Khi cần check tồn tại thì nên dùng || còn && thay cho if else. Kết hợp nhiều đk với ?: cx được VD: () ? (() ? () : ()) : () lồng nhau

//C3: dùng code javascript bth để lấy đối tượng javascript xong muôn dùng ở jsx thì nhét nó vào {}
let message = null;
if (condition == 0) message = <strong>Neutral</strong>;
else if (condition < 0) message = <strong>Negative</strong>;
else if (condition > 0) message = <strong>Positive</strong>;
console.log(<div>{message}</div>) // Type symbol

// Html entity
function EntityDisplay(props) {
    return <span>{props.message} &#9830;</span>
} // &#9830; hiện ngay nhưng trong string k hiện nên ta lưu hàm lại bằng 1 biến r dùng như dưới
const entity = String.fromCharCode;
console.log(<EntityDisplay message={`Tú lơ khơ ${entity(9824)} ${entity(9827)} ${String.fromCharCode(9829)}`} />)

function sum(x, y, z) {
    return x + y + z;
}
const numbersArr = [1, 2, 3];
console.log(sum.apply(null, numbersArr)); // K dùng this thì như này chả khác gì gọi bth. apply nhận tham số dạng mảng tự tách ra từng phần tử nên k cần destructuring
