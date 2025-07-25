import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [bal, setBal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      navigate("/signin");
    } else {
      axios
        .get("https://pocketpay-07db.onrender.com/api/v1/account/balance", {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        })
        .then((response) => {
          setBal(response.data.balance);
        })
        .catch(() => {
          navigate("/signin");
        });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome to PocketPay
            </h1>
            <p className="text-gray-600">
              Manage your transactions and send money with ease
            </p>
          </div>

          {/* Balance Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Your Balance
            </h2>
            <div className="bg-indigo-50 rounded-lg p-6">
              <Balance value={bal} />
            </div>
          </div>

          {/* Users Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Users</h2>
            <div className="bg-white rounded-lg">
              <Users />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-sm mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 PocketPay. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

// import { useEffect, useState } from "react";
// import  Appbar  from "../components/Appbar";
// import  Balance  from "../components/Balance";
// import  Users  from "../components/Users";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [bal, setBal] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userToken = localStorage.getItem("token");

//     // Check if token exists in local storage
//     if (!userToken) {
//       navigate("/signin"); // Redirect to sign-in page if token doesn't exist
//     } else {
//       // Fetch balance if token exists
//       axios
//         .get("http://localhost:3000/api/v1/account/balance", {
//           headers: {
//             Authorization: "Bearer " + userToken,
//           },
//         })
//         .then((response) => {
//           setBal(response.data.balance);
//         })
//         .catch((error) => {
//           navigate("/signin");
//         });
//     }
//   }, [navigate]);

//   return (
//     <div>
//       <Appbar />
//       <div className="m-8">
//         <Balance value={bal} />
//         <Users />
//       </div>
//     </div>
//   );
// };

// export default Dashboard ;
