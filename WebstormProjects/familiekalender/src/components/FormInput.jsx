import React from "react";

function FormInput({ label, id, type = "text", value, onChange, placeholder}) {
    return (
        <>
        <label htmlFor={id}>{label}</label>
        <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onnChange={onChange}
        />
        </>
    );
}

export default FormInput;
