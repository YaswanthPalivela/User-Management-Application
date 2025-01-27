import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users"; // This API does not support POST, PUT, DELETE
const USERS_PER_PAGE = 5;

const Home = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL); // this function fetches the users.
      setUsers(response.data);
    } catch (error) {
      setError("Failed to load users");
    }
  };

  // Delete User function Which Deletes the users and This won't work with jsonplaceholder.
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError("Failed to delete user");
    }
  };

  const paginatedUsers = users.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center">User Management</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex justify-between my-4">
        <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add User
        </Link>
      </div>
      <table className="mt-5 w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id} className="border">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.company.name}</td>
              <td className="p-2">
                <Link
                  to={`/edit/${user.id}`}
                  className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="mx-2 bg-gray-500 text-white px-3 py-1 rounded"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev * USERS_PER_PAGE < users.length ? prev + 1 : prev
            )
          }
          className="mx-2 bg-gray-500 text-white px-3 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
