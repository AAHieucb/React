import React from "react";

const SelectField = (props) => {
    const {
        field, form, // Có sẵn của formik
        options, label, placeholder // Tự custom
    } = props;
    const {name, onChange, onBlur, value} = field;
    // Formik chỉ cung cho ta lợi thế là 2 biến field và form ở mỗi component input. Các thuộc tính khác ta tự truyền vào formik handle cái onChange thì value là gì

    // 1 số lib cung select custom lại cái onChange k gửi event mà chỉ gửi giá trị. Đẻ kết hợp formik phải tự chuyển sang event ít nhất 2 trường name và value để xử lý như dưới:
    // const handleSelectedOptionChange = (selectedOption) => {
    //     const selectedValue = selectedOption ? selectedOption.value : selectedOption;
    //     const changeEvent = {
    //         name: name,
    //         value: selectedValue
    //     }
    //     field.onChange(changeEvent);
    // }
    return (
        <form>
            {label && <label for={name}>{label}</label>}
            <select
                id={name}
                {...field}
                // onChange={handleSelectedOptionChange}
                placeholder={placeholder}
            >
                {options.map((data) => (
                    <option value={data.value}>{data.label}</option>
                ))}
            </select>
        </form>
    )
}

export default SelectField;