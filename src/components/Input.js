import React from "react";
import { TextField } from "@mui/material";

const Input = ({ searchUser }) => {
    return (
        <div>
            <TextField
                id="outlined-basic"
                label="Search User.."
                variant="outlined"
                onChange={(e) => searchUser(e)}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "2rem 5rem 1rem 2rem"
                }}
            />
        </div>
    );
};

export default Input;
