import React, { useState } from 'react';
// import UserForm from './UserForm';

interface UserData {
  name: string;
  email: string;
  phone: string;
}

function UserPages({ data, updateProfile }: { data: UserData; updateProfile: (name: string, email:string, phone: string) => void }) {
  const [openTab, setOpenTab] = React.useState(1);
  const [name, setName]= useState(data.name)
  const [email, setEmail] = useState(data.email)
  const [phone, setPhone] = useState(data.phone)

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-black bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="fas fa-space-shuttle text-base mr-1 text-black"></i> Updates details
              </a>
            </li>

            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-black bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="fas fa-cog text-base mr-1 text-black"></i>  Settings
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-black bg-blueGray-600"
                    : "text-blueGray-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <i className="fas fa-briefcase text-base mr-1"></i>  Options
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">

                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <div className=" p-1 bg-gray-100 flex items-center justify-center">
                    <div className="container">
                      <h2 className="font-semibold text-xl text-gray-600">Update Your Personal details</h2>
                      <div className="bg-white rounded-xl shadow-lg  md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">

                          <div className="lg:col-span-1">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                              <div className="md:col-span-5">
                                <label htmlFor="full_name">Full Name</label>
                                <input value={name} onChange={e=>setName(e.target.value)} type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                              </div>
                              <div className="md:col-span-5">
                                <label htmlFor="email">Email Address</label>
                                <div className="flex flex-col">
                                  <input value={email} onChange={e=>setEmail(e.target.value)} type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                <p className="text-xs text-blue-500 ml-2">
                                  Note: Email verification link will be sent to the provided email.
                                </p>
                                </div>
                              </div>
                              <div className="md:col-span-5">
                                <label htmlFor="address">Phone</label>
                                <input value={phone} onChange={e=>setPhone(e.target.value)} type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                              </div>
                              <div className="md:col-span-5 text-right">
                                <div className="inline-flex items-end">
                                  <button onClick={()=>updateProfile(name,email,phone)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <p>
                    Completely synergize resource taxing relationships via
                    premier niche markets. Professionally cultivate one-to-one
                    customer service with robust ideas.
                    <br />
                    <br />
                    Dynamically innovate resource-leveling customer service for
                    state of the art customer service.
                  </p>
                </div>

                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <p>
                    Efficiently unleash cross-media information without
                    cross-media value. Quickly maximize timely deliverables for
                    real-time schemas.
                    <br />
                    <br /> Dramatically maintain clicks-and-mortar solutions
                    without functional solutions.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default UserPages;
