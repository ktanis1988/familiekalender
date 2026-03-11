import React from "react";

function Button({
                    type = "button",
                    variant = "primary", // "primary" | "secondary" | "tertiary"
                    className = "",
                    disabled = false,
                    onClick,
                    children,
                }) {
    const variantClass = variant === "primary" ? "" : variant;

    return (
        <button
            type={type}
            className={`buton ${variantClass} ${className}`}
            disabled={disabled}
            onClick={onClick}
            >
            {children}
        </button>
    );
}

export default Button;
