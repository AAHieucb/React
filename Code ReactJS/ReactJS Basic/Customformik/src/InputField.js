import React from "react";

const InputField = (props) => {
    const {
        field, form, // Từ FastField của formik có sẵn
        type, label, placeholder, disabled // Tự custom
    } = props;
    console.log(props);
    const {name} = field; // Gồm onChange, onBlur, value tự có của Formik
    return(
        <form>
            {label && <label for={name}>{label}</label>}
            <input 
                id={name}
                {...field}
                type={type}
                disabled={disabled}
                placeholder={placeholder}
            />
        </form>
    )
}

export default InputField;