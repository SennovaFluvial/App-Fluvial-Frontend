import React from "react";
import { LoadingBox } from "./LoadingBox";

export const Grid = ({ children }) => {
    return (
        <div className="grid">
            <LoadingBox>{children}</LoadingBox>
        </div>
    );
};