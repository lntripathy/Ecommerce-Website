import { FaSpinner } from "react-icons/fa";

const PaymentLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white px-4">
      <div className="flex flex-col items-center gap-6">
        <FaSpinner className="animate-spin text-pink-700 text-6xl" />
        <h1 className="text-2xl font-bold text-pink-700">Initializing Payment Gateway...</h1>
        <p className="text-gray-600 text-center max-w-md">
          Please wait while we securely connect to the payment service. This may take a few seconds.
        </p>
      </div>
    </div>
  );
};

export default PaymentLoading;
