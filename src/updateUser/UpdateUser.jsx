import React, { useEffect, useState } from "react";
import "./Update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = () => {
  const navigate = useNavigate();
  const users = {
    name: "",
    email: "",
    number: "",
    product: "",
  };

  const products = ["A", "B", "C", "D", "E"];

  const [user, setUser] = useState(users);
  const { id } = useParams();

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/user/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/update/user/${id}`,
        user
      );

      toast.success(res.data.message, { position: "top-center" });
      navigate("/");
    } catch (error) {
      toast.error(res.data.message, { position: "top-center" });
    }
  };
  return (
    <div className="adduser">
      <Link to="/" type="submit" className="btn btn-primary">
        <i class="fa-solid fa-backward" style={{ marginRight: "8px" }}></i>
        Back
      </Link>
      <h3>Update user</h3>
      <form action="" className="adduserform" onSubmit={handleSubmit}>
        <div className="inputgroup">
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={inputHandle}
            autoComplete="off"
            placeholder="Enter your Name"
          />
        </div>
        <div className="inputgroup">
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={inputHandle}
            autoComplete="off"
            placeholder="Enter your Email"
          />
        </div>
        <div className="inputgroup">
          <label htmlFor="number">Number : </label>
          <input
            value={user.number}
            type="text"
            name="number"
            id="number"
            onChange={inputHandle}
            autoComplete="off"
            placeholder="Enter your Number"
            title="Number must be exactly 10 digits"
            maxLength="10"
          />
        </div>
        <div className="inputgroup">
          <label htmlFor="product">Products : </label>
          <select
            name="product"
            id="product"
            onChange={inputHandle}
            value={user.product}
          >
            <option value="">Select a product</option>
            {products.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
        <div className="inputgroup">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
