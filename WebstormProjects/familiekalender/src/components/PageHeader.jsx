import React from "react";

function PageHeader({ className = "", left, title, right }) {
    return (
        <header className={className}>
            {left}
            <h1>
                {title}
            </h1>
            {right}
        </header>
    );
}

export default PageHeader;