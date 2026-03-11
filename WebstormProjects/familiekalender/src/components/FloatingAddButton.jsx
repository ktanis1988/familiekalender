import React from "react";

function FloatingAddButton({ onClick, label = "+" }) {
    return (
        <button className="add-button" onClick={onClick}>
            {label}
        </button>
    );
}

export default FloatingAddButton;
