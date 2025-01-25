// import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const SendMoney = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userToken = localStorage.getItem("token");

//     // Check if token exists in local storage
//     if (!userToken) {
//       navigate("/signin"); // Redirect to sign-in page if token doesn't exist
//     }
//   }, []);

//   const [searchParams] = useSearchParams();
//   const id = searchParams.get("id");
//   const name = searchParams.get("name");
//   const [amount, setAmount] = useState(0);

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="h-full flex flex-col justify-center">
//         <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
//           <div className="flex flex-col p-6">
//             <h2 className="text-3xl font-bold text-center">Send Money</h2>
//           </div>
//           <div className="p-6">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
//                 <span className="text-2xl text-white">
//                   {name && name.length > 0 && name[0].toUpperCase()}
//                 </span>
//               </div>
//               <h3 className="text-2xl font-semibold">{name}</h3>
//             </div>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                   Amount (in Rs)
//                 </label>
//                 <input
//                   onChange={(e) => {
//                     setAmount(e.target.value);
//                   }}
//                   type="number"
//                   className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//                   id="amount"
//                   placeholder="Enter amount"
//                 />
//               </div>
//               <button
//                 onClick={async () => {
//                   const res = await axios.post(
//                     "http://localhost:3000/api/v1/account/transfer",
//                     {
//                       to: id,
//                       amount,
//                     },
//                     {
//                       headers: {
//                         Authorization:
//                           "Bearer " + localStorage.getItem("token"),
//                       },
//                     }
//                   );
//                   // console.log(res.data.message);
//                   navigate("/paymentstatus?message=" + res?.data.message);
//                 }}
//                 className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
//               >
//                 Initiate Transfer
//               </button>
//               <button
//                 onClick={() => navigate("/dashboard")}
//                 className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-red-500 text-white"
//               >
//                 Cancel & Go Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SendMoney ;

import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const SendMoney = () => {
  // 1. Basic setup and state
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get receiver's details from URL
  const receiverId = searchParams.get("id");
  const receiverName = searchParams.get("name");

  // 2. Handle money transfer
  const handleTransfer = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: receiverId,
          amount: parseInt(amount)
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      navigate("/paymentstatus?message=" + response.data.message);
    } catch (error) {
      navigate("/paymentstatus?message=Transfer failed");
      console.log(error);
      
    }
  };

  // 3. Component UI
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Main card */}
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Send Money
        </h2>

        {/* Receiver info */}
        <div className="flex items-center space-x-4 mb-6">
          {/* Avatar */}
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-white">
              {receiverName?.[0]?.toUpperCase()}
            </span>
          </div>
          
          {/* Name */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {receiverName}
            </h3>
            <p className="text-sm text-gray-500">
              Receiver
            </p>
          </div>
        </div>

        {/* Amount input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (in Rs)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          {/* Send button */}
          <button
            onClick={handleTransfer}
            disabled={isLoading || !amount}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 
              disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Send Money"}
          </button>

          {/* Cancel button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;