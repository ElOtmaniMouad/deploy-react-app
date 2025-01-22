import React from 'react';
import { Link } from 'react-router-dom';
import notimg from '../assets/notfound.jpg';
export default function NotFound() {
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      <div className="mt-8">
        <img
          src={notimg}
          alt="Not Found Illustration"
          className="w-96 h-auto"
        />
<Link to="/" className="px-6 py-3 bg-blue-600 text-black font-medium rounded-md shadow-lg hover:bg-blue-700 transition duration-300">
        Go Back Home
      </Link>

      <h1 className="text-6xl font-bold text-red-600 mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      </div>
    </div>
  );
}

