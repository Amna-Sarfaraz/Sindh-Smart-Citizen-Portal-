import React, { useState } from "react";
import bgImg from "../assets/bg.png";

export default function Profile() {
  const [edit, setEdit] = useState(false);

  const [data, setData] = useState({
    name: "John Doe",
    father: "Muhammad Ali",
    email: "john.doe@smartcity.gov",
    phone: "+1 234 567 8900",
    address: "Sector 12, Smart City",
    district: "Smart District",
    cnic: "42201-*****-*****-1234",
    dob: "15 July 1985",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  const [avatar, setAvatar] = useState(data.avatar);


  return (
    <div className="bg-slate-100 min-h-screen pt-4 px-4 relative">

      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">

          {/* Avatar */}
          <div className="relative">
            <img
              src={avatar}
              alt="Avatar"
              className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-blue-950 object-cover shadow-lg"
            />

            {edit && (
              <label className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full cursor-pointer hover:bg-gray-300">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => setAvatar(ev.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                Upload
              </label>
            )}
          </div>

          {/* Name & CNIC */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{data.name}</h1>
            <p className="mt-2 text-lg font-semibold text-gray-700">CNIC: {data.cnic}</p>
          </div>

        </div>

        {/* Edit Button */}
        {!edit && (
          <button
            className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800"
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        )}
      </div>


      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mt-2">

        {/* Left Side */}
        <div className="flex flex-col gap-4">

          {/* Complaint Stats */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4 text-lg">Complaint Stats</h3>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="text-2xl font-bold text-blue-600">47</h2>
                <p className="text-sm text-gray-600">Filed</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="text-2xl font-bold text-green-600">24</h2>
                <p className="text-sm text-gray-600">Resolved</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="text-2xl font-bold text-orange-500">15</h2>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </div>


          {/* Security Logs */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold border-b pb-3 mb-2 text-lg">Security Logs</h3>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-700">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left">Device</th>
                  <th className="text-left">Location</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-2">April 22, 2024</td>
                  <td>Laptop</td>
                  <td>Karachi</td>
                  <td className="text-green-600">Success</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">April 20, 2024</td>
                  <td>Mobile</td>
                  <td>Lahore</td>
                  <td className="text-green-600">Success</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">April 18, 2024</td>
                  <td>Tablet</td>
                  <td>Dubai</td>
                  <td className="text-red-500">Fail</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">April 15, 2024</td>
                  <td>Mobile</td>
                  <td>Karachi</td>
                  <td className="text-red-500">Fail</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>


        {/* Right Side Form */}
        <div>
          <div className="bg-white rounded-xl shadow p-6">

            <h3 className="font-semibold mb-2 text-lg">Profile</h3>

            <div className="flex flex-col gap-4">
              {["name","father","phone","email","address","district","cnic","dob"].map((field) => (
                <div key={field}>
                  <label className="text-sm text-gray-600">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    value={data[field]}
                    onChange={(e) => setData({ ...data, [field]: e.target.value })}
                    className="w-full border rounded-md p-2 mt-1"
                    disabled={!edit}
                  />
                </div>
              ))}

              {edit && (
                <div className="flex gap-3 mt-2">
                  <button
                    className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800"
                    onClick={() => { setData({ ...data, avatar }); setEdit(false); }}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                    onClick={() => { setAvatar(data.avatar); setEdit(false); }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>


      {/* Bottom Background */}
      <div
        className="absolute bottom-0 w-[800px] h-[200px] rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.85,
        }}
      />

    </div>
  );
}