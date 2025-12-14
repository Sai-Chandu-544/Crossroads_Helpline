import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../features/usersSlice";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          User Dashboard
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <UserForm />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
