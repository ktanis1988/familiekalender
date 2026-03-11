import React from "react";

function Message({type = "info", children }) {
    if (!children) return null;

    if (type === "error") return <p className="error-message">{children}</p>;
    if (type === "loading") return <p className="loading-message">{children}</p>;
    if (type === "empty") return <p className="no-activities">{children}</p>;

    return <p>{children}</p>;
}

export default Message;