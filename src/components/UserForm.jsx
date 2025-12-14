import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/usersSlice";

const UserForm = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addUser({
        id: Date.now(),
        name,
        email: `${name}@mail.com`,
      })
    );

    setName("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        Add User
      </button>
    </form>
  );
};

export default UserForm;
