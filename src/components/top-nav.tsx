'use client'

import React from 'react'
import { LogOutIcon } from 'lucide-react'
import { signOut } from "next-auth/react"
import Link from 'next/link'

const TopNav = () => {
  // const sessiion= awai
  return (
    <div className="h-16 bg-white shadow-xl w-full ">
      <div className="flex justify-between pt-4 mx-10 gap-2">
        <div>
          <span className="font-bold sm:text-lg md:text-xl lg:text-2xl  ">
            Khatra Events Admin
          </span>
        </div>

        <div className="flex gap-5">
          <Link href="/" className='border-2 border-blue-500 rounded-lg text-blue-500 hover:text-white hover:bg-blue-500 px-2 '>Go to Home</Link>
          <div className='flex gap-1 text-lg'>
          <span>
            Admin
          </span>
          <button onClick={() => {
            signOut({
              callbackUrl: '/',
              redirect: true,
            })
          }}>
            <LogOutIcon className='p-1 mb-1 hover:text-red-500 hover:border-red-500' />

          </button>
        </div>
        </div>

      </div>
    </div>)
}

export default TopNav