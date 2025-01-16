import React from 'react'

function UserForm() {
  return (
    <>
   {/* component */}
<div className=" p-1 bg-gray-100 flex items-center justify-center">
  <div className="container">
      <h2 className="font-semibold text-xl text-gray-600">Update Your Personal details</h2>
      <div className="bg-white rounded-xl shadow-lg  md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
          
          <div className="lg:col-span-1">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label htmlFor="full_name">Full Name</label>
                <input type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
              </div>
              <div className="md:col-span-5">
                <label htmlFor="email">Email Address</label>
                <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  defaultValue="email@domain.com" />
              </div>
              <div className="md:col-span-5">
                <label htmlFor="address">Address / Street</label>
                <input type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"   />
              </div>
              <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   

</div>

    </>
  )
}

export default UserForm
