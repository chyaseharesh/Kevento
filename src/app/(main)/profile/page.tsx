/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from "react";
import '../../css/user.css'; // Keep if you have additional custom styles
import { UserIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";
import UserPages from "@/components/common/userprofileseeting";
import { signOut, useSession } from "next-auth/react";
import Loading from "@/components/ui/loding";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";


const UserProfile: React.FC = () => {
  const session = useSession();
  interface UserProfile {
    emailVerified: boolean;
    name: string;
    email: string;
    phone: string;
    // Add other user profile properties here
  }

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);


  //get user profile
  const getUserProfile = async () => {
    try {
      const response = await axios.get('/api/user/profile');
      if (response.data.success) {
        setUserProfile(response.data.user);
      } else {
        console.error("Failed to fetch user profile.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  // update profile
  const updateUserProfile = async (name: string, email:string, phone: string) => {
    try {
      const response = await axios.patch('/api/user/profile',
        {
          name,
          email,
          phone,
        }
      );
      console.log(response)
      if (response.data.success) {
        toast.success(response.data.message);
        getUserProfile()
        if(response.data.user.email!==session.data?.user.email){
        signOut({ callbackUrl: '/' })
        }
      } else {
        toast.error(response.data.error)
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went Wrong!")
    }
  };



  // Perform async data fetching on the server side
  //loading comopent.
  if (session.status === "loading") {
    return <Loading />;
  } else if (!session) {
    // If the user is not logged in, redirect to login page
    redirect("/login");
  }
  //function to verify email using axios
  const verifyEmail = async () => {
    try {
      const response = await axios.post('/api/user/profile/verify-email', { email: session?.data?.user.email });
      if (response.data.success) {
        alert("Email verification sent to your registered email!");
      } else {
        alert("Failed to send email verification.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send email verification.");
    }
  };

  //function to update user profile using axios

  return (
    <div className="container mx-auto p-4">
      <div className="profile-header flex items-center gap-4">
        <div className="profile-img">
          <img
            src={session?.data?.user.image ?? "https://img.freepik.com/premium-vector/asian-men-avatar_7814-345.jpg"}
            width={200}
            alt="Profile Image"
          />
          <div className="w-64 h-64 hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
            <img className="hidden group-hover:block w-12" src="https://www.svgrepo.com/show/33565/upload.svg" alt="Upload" />
          </div>
        </div>

        <div className="profile-nav-info">
          <h3 className="text-xl font-semibold text-primary-active">{session?.data?.user.name}</h3>
          <div className="address">
            <p id="state" className="text-gray-600">{session?.data?.user.email}</p>
            {
              userProfile?.emailVerified ? (
                <span className="text-sm px-2 font-normal text-green-600 border border-green-600 rounded-full">verified</span>
              ) : (
                <button onClick={verifyEmail} className="text-sm px-2 font-normal text-red-600 border border-red-600 rounded-full hover:bg-red-600 hover:text-white">Verify</button>

              )
            }
          </div>
        </div>
      </div>

      <div className="main-bd mt-6 flex gap-6 w-full">
        <div className="left-side flex">
          <div className="profile-side flex-1">
            <h1 className="text-xl font-bold mb-4">User Profile</h1>

            {/* Name */}
            <div className="flex items-center mb-3">
              <UserIcon className="h-6 w-6 text-primary hover:text-primary-hover mr-2" />
              <span className="text-gray-700 font-medium">{session?.data?.user.name}</span>
            </div>

            {/* Email */}
            <div className="flex items-center mb-3 hover:bg-gray-200 ">
              <Link
                href="/profile/purchases"
                className="block rounded-lg px-4 py-2 font-medium text-gray-600 hover:bg-gray-100"
              >
                Purchases
              </Link>
            </div>

          </div>
        </div>

        <div className="right-side w-full">
          {userProfile && <UserPages data={userProfile} updateProfile={updateUserProfile} />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
