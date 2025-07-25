

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
        "https://pocketpay-07db.onrender.com/api/v1/account/transfer",
        {
          to: receiverId,
          amount: parseInt(amount),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
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