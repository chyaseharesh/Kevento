'use client';
import React from 'react'
// pages/verification-failed.tsx
export default function VerificationFailed() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Verification Failed
          </h1>
          <p className="text-gray-600 mt-2">
            Unfortunately, your email verification link is invalid or has expired. Please request a new verification link to continue.
          </p>
          <button
            onClick={() => (window.location.href = "/profile")}
            className="mt-6 px-6 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }
  