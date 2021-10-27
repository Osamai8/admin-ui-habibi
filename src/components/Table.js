import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
    Paper,
    Checkbox,
    IconButton,
    Tooltip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

export default function EnhancedTable({
    currentUsers,
    deleteUser,
    selected,
    setSelected,
    deleteSelectedHandler
}) {
    const [newUsers, setNewUsers] = useState([]);
    const [savedUser, setSavedUser] = useState({
        name: "",
        email: "",
        role: ""
    });

    // SELECT ALL USERS ON THE PAGE
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = currentUsers.map((user) => user.name);
            setSelected(newSelecteds);
            return currentUsers.map((user) => selected.concat(user));
        }
        setSelected([]);
    };
    // SELECT USERS
    const handleClick = (name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // UPDATE USER
    const updateHandler = (id, key, value) => {
        currentUsers.map((user) => {
            if (user.id === id) {
                setSavedUser({ ...savedUser, [key]: value });
            }
        });
    };

    // EDIT USER
    const editUser = (id) => {
        let data = currentUsers.map((user) => {
            if (user.id === id) {
                user.editStatus = true;
            }
            return user;
        });
        setNewUsers(data);
    };

    // SAVE USER NEW DATA
    const saveUserHandler = (id) => {
        let data = currentUsers.map((user) => {
            if (user.id === id) {
                user.name = savedUser.name ? savedUser.name : user.name;
                user.email = savedUser.email ? savedUser.email : user.email;
                user.role = savedUser.role ? savedUser.role : user.role;
                user.editStatus = false;
            }
            return user;
        });
        setSavedUser({ name: "", email: "", role: "" });
        setNewUsers(data);
    };

    // CANCEL EDITING USER
    const cancelEditingHandler = (id) => {
        let data = currentUsers.map((user) => {
            if (user.id === id) {
                user.editStatus = false;
            }
            return user;
        });
        setSavedUser({
            name: "",
            email: "",
            role: ""
        });
        setNewUsers(data);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        ...(selected.length > 0 && {
                            bgcolor: (theme) =>
                                alpha(
                                    theme.palette.primary.main,
                                    theme.palette.action.activatedOpacity
                                )
                        })
                    }}
                >
                    {selected.length > 0 ? (
                        <Typography
                            sx={{ flex: "1 1 100%" }}
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                        >
                            {selected.length} selected
                        </Typography>
                    ) : (
                        <Typography
                            sx={{ flex: "1 1 100%" }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Admin UI
                        </Typography>
                    )}

                    {selected.length > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton onClick={() => deleteSelectedHandler()}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Admin">
                            <IconButton>
                                <SupervisedUserCircleIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Toolbar>

                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="small"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        indeterminate={
                                            selected.length > 0 &&
                                            selected.length < currentUsers.length
                                        }
                                        checked={
                                            currentUsers.length > 0 &&
                                            selected.length === currentUsers.length
                                        }
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            "aria-label": "select all"
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Role</TableCell>
                                <TableCell align="center">Edit</TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user, index) => {
                                    const isItemSelected = isSelected(user.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={user.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    onClick={() => handleClick(user.name)}
                                                    inputProps={{
                                                        "aria-labelledby": labelId
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                <input
                                                    type="text"
                                                    value={`${user.editStatus ? savedUser.name : user.name
                                                        }`}
                                                    placeholder={`${user.editStatus ? user.name : ""}`}
                                                    onInput={(e) =>
                                                        updateHandler(user.id, "name", e.target.value)
                                                    }
                                                    className={` ${user.editStatus ? "editable" : "non-editable"
                                                        }`}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <input
                                                    type="email"
                                                    value={`${user.editStatus ? savedUser.email : user.email
                                                        }`}
                                                    placeholder={`${user.editStatus ? user.email : ""}`}
                                                    onInput={(e) =>
                                                        updateHandler(user.id, "email", e.target.value)
                                                    }
                                                    className={`non-editable ${user.editStatus ? "editable" : ""
                                                        }`}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                <input
                                                    type="text"
                                                    value={`${user.editStatus ? savedUser.role : user.role
                                                        }`}
                                                    placeholder={`${user.editStatus ? user.role : ""}`}
                                                    onInput={(e) =>
                                                        updateHandler(user.id, "role", e.target.value)
                                                    }
                                                    className={` ${user.editStatus ? "editable" : "non-editable"
                                                        }`}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                {user.editStatus ? (
                                                    <>
                                                        <IconButton
                                                            onClick={() => saveUserHandler(user.id)}
                                                        >
                                                            <SaveIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => cancelEditingHandler(user.id)}
                                                        >
                                                            <CloseIcon style={{ color: "red" }} />
                                                        </IconButton>
                                                    </>
                                                ) : (
                                                    <>
                                                        <IconButton onClick={() => editUser(user.id)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton onClick={() => deleteUser(user.id)}>
                                                            <DeleteIcon style={{ color: "red" }} />
                                                        </IconButton>
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                                // {/* </TableBody> */}
                            ) : (
                                // {/* <TableBody>  */}
                                <>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <h1
                                            style={{
                                                margin: "2rem",
                                                textAlign: "center"
                                            }}
                                        >
                                            NO USER TO
                                            <br /> DISPLAY
                                        </h1>
                                    </TableCell>
                                </>
                            )}
                        </TableBody>

                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
