import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationControlled = ({ users, currentPage, setCurrentPage }) => {
    const rouNum = users.length / 10;

    const handleChange = (e, value) => {
        setCurrentPage(value);
    };

    return (
        <Stack spacing={2}>
            <Pagination
                count={Math.round(rouNum)}
                page={currentPage}
                showFirstButton
                showLastButton
                onChange={handleChange}
                style={{ display: "flex", justifyContent: "center", margin: "3rem 0" }}
            />
        </Stack>
    );
};

export default PaginationControlled;
