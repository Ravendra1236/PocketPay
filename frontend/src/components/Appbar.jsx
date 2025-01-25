import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Appbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      navigate("/signin");
    } else {
      axios.get("http://localhost:3000/api/v1/user/getUser", {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/signin");
      });
    }
  }, []);

  const signOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="shadow-md bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            {/* Logo Icon */}
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-105">
              <span className="text-xl font-bold text-white">P</span>
            </div>
            {/* Logo Text */}
            <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 transition-colors duration-200 hover:from-indigo-500 hover:to-purple-500">
              PocketPay
            </div>
          </Link>

          {/* Right side - User info and Sign Out */}
          <div className="flex items-center space-x-6">
            <button
              onClick={signOutHandler}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg transition-all duration-200 hover:shadow-md hover:from-indigo-500 hover:to-purple-500"
            >
              Sign Out
            </button>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                {user?.firstName} {user?.lastName}
              </span>

              {/* User Avatar */}
              <div className="relative">
  <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center transition-transform duration-200 hover:scale-105 cursor-pointer">
    <span className="text-lg font-bold text-white">
      {user?.firstName?.[0]?.toUpperCase()}
    </span>
  </div>
  {/* Online Status Indicator */}
  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;