import React from "react";
import CustomFieldMain from "./CustomFieldMain";

// Cũng chỉ là tạo 1 component CustomField trung gian để xử lý formik cho component CustomFieldMain có sẵn
const CustomField = (props) => {
    const {field, form, label} = props;
    const {name, value, onBlur} = field;

    const handleImageUrlChange = (newImageUrl) => {
        console.log(form);
        form.setFieldValue(name, newImageUrl);
        // Hàm của formik làm thay đổi thuộc tính gì thành mang giá trị gì, name là giát trị bị đổi ở đây. Hàm này để update value còn onChange thì buộc phải truyền vào event 
    }
    return(
        <div>
            {label && <label for={name}>{label}</label>}
            <CustomFieldMain
                name={name} // Thuộc tính nào lấy thì truyền vào 
                imageUrl={value}
                onImageUrlChange={handleImageUrlChange}
                onRandomButtonBlur={onBlur}
            />
        </div>
    )
}
export default CustomField;