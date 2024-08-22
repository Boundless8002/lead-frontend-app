import React, { useEffect, useState } from "react";
import "./User.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortedUsers, setSortedUsers] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/delete/user/${userId}`
      );
      setUsers((prev) => prev.filter((user) => user._id !== userId));
      toast.success(response.data.message, { position: "top-center" });
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  const handleSearch = () => {
    const filteredUsers = users
      .filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
    setSortedUsers(filteredUsers);
    setIsSearchActive(true);
  };

  return (
    <div className="userTable">
      <Link to="/add" type="button" className="btn btn-primary">
        Add Lead <i className="fa-solid fa-user-plus"></i>
      </Link>
      <div className="search-sort">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.NO</th>
            <th scope="col"> Name</th>
            <th scope="col">Email</th>
            <th scope="col">Number</th>
            <th scope="col">Product</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(isSearchActive ? sortedUsers : users).map((user, id) => {
            return (
              <tr key={user._id}>
                <td>{id + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.number}</td>
                <td>{user.product}</td>
                <td className="actions">
                  <Link to={`update/` + user._id}>
                    <i className="fa-solid fa-pen-to-square edit"></i>
                  </Link>
                  <Link onClick={() => deleteUser(user._id)}>
                    <i className="fa-solid fa-trash deleteOption"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
