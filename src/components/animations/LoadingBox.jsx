import React from "react";

export const LoadingBox = ({ children }) => {
    return React.Children.map(children, (child) => (
        <div className="loading-box">{child}</div>
    ));
};
