import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full flex flex-col gap-6 border border-gray-200 text-center">

        <h1 className="text-3xl font-extrabold text-pink-700">Forgot Password?</h1>

        <p className="text-gray-600">
          Don't worry! Please contact the admin directly to reset your password.
        </p>

        <div className="flex flex-col gap-4">
          <a
            href="tel:+917815030459"
            className="flex items-center gap-2 justify-center text-pink-700 hover:text-pink-800 font-semibold"
          >
            <FaPhoneAlt /> +91 78150 30459
          </a>
          <a
            href="mailto:lntripathyofficial@gmail.com"
            className="flex items-center gap-2 justify-center text-pink-700 hover:text-pink-800 font-semibold"
          >
            <FaEnvelope /> lnt.admin@lnkart.com
          </a>
        </div>

        <Link
          to="/"
          className="mt-4 inline-block px-6 py-2 rounded-full bg-pink-700 text-white hover:bg-pink-800 transition-transform transform hover:scale-105 shadow-md font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
