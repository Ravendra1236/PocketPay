import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://pocketpay-1.onrender.com/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg 
            className="w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-2">
        {users.map((user) => (
          <UserCard user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
};

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-lg font-semibold text-white">
                {user.firstName?.[0]?.toUpperCase()}
              </span>
            </div>
            {/* Optional: Online Status Indicator */}
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
          </div>

          {/* User Details */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-sm text-gray-500">
              {user.username}
            </span>
          </div>
        </div>

        {/* Send Money Button */}
        <button
          onClick={() => {
            navigate(`/send?id=${user._id}&name=${user.firstName}`);
          }}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
            />
          </svg>
          Send Money
        </button>
      </div>
    </div>
  );
};

export default Users;