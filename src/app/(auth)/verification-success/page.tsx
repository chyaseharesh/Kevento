'use client';
import React from 'react'
// pages/verification-success.tsx
export default function VerificationSuccess() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Email Verified Successfully!
          </h1>
          <p className="text-gray-600 mt-2">
            Your email address has been successfully verified. You can now enjoy full access to your account and buy tickets.
          </p>
          <button
            onClick={() => (window.location.href = "/profile")}
            className="mt-6 px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  }
  