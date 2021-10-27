import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import EnhancedTable from "./components/Table";
import PaginationControlled from "./components/Pagination";
import axios from "axios";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [selected, setSelected] = useState([]);
  // const [newUsers, setNewUsers] = useState([]);

  // FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      // setIsLoading(true);
      const response = await axios.get(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      setUsers(response.data);
      // setIsLoading(false);
    };
    fetchUsers();
    //
  }, []);

  // SEARCH USER
  const searchUser = (e) => {
    setSearchInput(e.target.value);
    let filteredUsers = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.role.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setUsers(filteredUsers);
  };

  // DELETE USER
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // DELETE SELECTED USERS
  const deleteSelectedHandler = () => {
    let selectedUserId = selected.map((user) => user);
    const data = users.filter((item) => !selectedUserId.includes(item.name));
    setUsers(data);
    setSelected([]);
  };

  // USERS PER PAGE
  const indexOfLastUser = currentPage * usersPerPage; //1*10 =10:   2*10=20:....
  const indexofFirstUser = indexOfLastUser - usersPerPage; //10-10=0: 20-10=10:....
  // const currentUsers = users.slice(indexOfLastUser, indexofFirstUser);
  let currentUsers = users.slice(indexofFirstUser, indexOfLastUser); //0,10  : 10,20:....

  return (
    <div>
      <Input searchUser={searchUser} />
      <EnhancedTable
        deleteSelectedHandler={deleteSelectedHandler}
        currentUsers={currentUsers}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        deleteUser={deleteUser}
        // setUsers={setUsers}
        // users={users}
        selected={selected}
        setSelected={setSelected}
      // setNewUsers={setNewUsers}
      />
      <PaginationControlled
        users={users}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default App;
