import { useSelector, useDispatch } from "react-redux";
import { deleteUser, updateUser } from "../features/usersSlice";
import { useState } from "react";

const UserTable = () => {
  const { users, loading, error } = useSelector(
    (state) => state.users
  );

  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const startEdit = (user) => {
    setEditingId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
    });
  };

  const saveEdit = (id) => {
    dispatch(
      updateUser({
        id,
        name: formData.name,
        email: formData.email,
      })
    );
    setEditingId(null);
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading...</p>;

  if (error)
    return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              {/* NAME */}
              <td className="p-3">
                {editingId === user.id ? (
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  user.name
                )}
              </td>

              {/* EMAIL */}
              <td className="p-3">
                {editingId === user.id ? (
                  <input
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  user.email
                )}
              </td>

              {/* ACTIONS */}
              <td className="p-3 flex gap-2">
                {editingId === user.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(user.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer" 
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(user)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => dispatch(deleteUser(user.id))}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No users found
        </p>
      )}
    </div>
  );
};

export default UserTable;
