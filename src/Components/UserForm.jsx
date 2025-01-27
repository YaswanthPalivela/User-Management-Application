import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users"; // This API does not support POST, PUT, DELETE

const UserForm = ({ isEditing = false }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    company: { name: "" },
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEditing) {
      axios
        .get(`${API_URL}/${id}`)
        .then((response) => {
          setUser({
            name: response.data.name,
            email: response.data.email,
            company: { name: response.data.company.name },
          });
        })
        .catch(() => setErrors({ fetch: "Failed to fetch user data" }));
    }
  }, [isEditing, id]);

  const validate = () => {
    let tempErrors = {};
    if (!user.name.trim()) tempErrors.name = "Name is required.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(user.email))
      tempErrors.email = "Invalid email format.";
    if (!user.company.name.trim())
      tempErrors.department = "Department is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const method = isEditing ? axios.put : axios.post;
    const url = isEditing ? `${API_URL}/${id}` : API_URL;

    method(url, user)
      .then(() => navigate("/"))
      .catch(() => alert("Failed to save user"));
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center">
        {isEditing ? "Edit" : "Add"} User
      </h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          type="text"
          placeholder="Full Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="border p-2 w-full"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border p-2 w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        <input
          type="text"
          placeholder="Department"
          value={user.company.name}
          onChange={(e) =>
            setUser({ ...user, company: { name: e.target.value } })
          }
          className="border p-2 w-full"
        />
        {errors.department && (
          <p className="text-red-500">{errors.department}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default UserForm;
