


import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");
  const navigate = useNavigate();
  const isSuccess = message?.toLowerCase().includes("successful");

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      navigate("/signin");
    } else {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        {/* Status Icon */}
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6
          ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
          {isSuccess ? (
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        {/* Message */}
        <h2 className={`text-2xl font-bold mb-4 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>

        {/* Redirect Message */}
        <p className="text-sm text-gray-500 mb-6">
          Redirecting to Dashboard in 3 seconds...
        </p>

        {/* Return Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-lg 
            hover:bg-indigo-700 transition-colors duration-200"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus;