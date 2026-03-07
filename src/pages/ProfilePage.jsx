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

  const metrics = [
    { label: "Filed", count: 47, color: "text-[#1b3a57]" },
    { label: "Resolved", count: 24, color: "text-green-600" },
    { label: "Active", count: 15, color: "text-orange-500" },
  ];

  const logs = [
    { date: "April 22, 2024", device: "Laptop", location: "Karachi", status: "Success", color: "text-green-600" },
    { date: "April 20, 2024", device: "Mobile", location: "Lahore", status: "Success", color: "text-green-600" },
    { date: "April 18, 2024", device: "Tablet", location: "Dubai", status: "Fail", color: "text-red-500" },
    { date: "April 15, 2024", device: "Mobile", location: "Karachi", status: "Fail", color: "text-red-500" },
  ];

  const profileFields = ["name","father","phone","email","address","district","cnic","dob"];

  return (
    <div className="bg-[#f9f7f1] min-h-screen pt-6 px-6 font-sans text-gray-800 relative">

      {/* Background */}
      <div
        className="absolute bottom-0 w-[800px] h-[150px] rounded-2xl overflow-hidden opacity-100"
        style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <div className="relative z-10">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img src={avatar} alt="Avatar" className="w-36 h-36 md:w-40 md:h-40 rounded-full border-2 border-gray-200 object-cover shadow-md" />
              {edit && (
                <label className="absolute bottom-0 right-0 bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200">
                  <input type="file" className="hidden" onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = ev => setAvatar(ev.target.result);
                      reader.readAsDataURL(file);
                    }
                  }} />
                  Upload
                </label>
              )}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1b3a57]">{data.name}</h1>
              <p className="mt-1 text-lg font-medium text-gray-600">CNIC: {data.cnic}</p>
            </div>
          </div>
          {!edit && (
            <button className="bg-[#1b3a57] text-white px-6 py-2 rounded-lg hover:bg-[#254a78] font-semibold shadow-md"
              onClick={() => setEdit(true)}>
              Edit Profile
            </button>
          )}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">

          {/* Left Side */}
          <div className="flex flex-col gap-6">

            {/* Complaint Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold mb-4 text-xl border-b pb-2 text-[#1b3a57]">Complaint Stats</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                {metrics.map(m => (
                  <div key={m.label} className="bg-[#f6f5f1] rounded-xl p-4 shadow-inner">
                    <h2 className={`text-2xl font-bold ${m.color}`}>{m.count}</h2>
                    <p className="text-sm text-gray-600">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Logs */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold mb-3 text-xl border-b pb-2 text-[#1b3a57]">Security Logs</h3>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#f6f5f1] text-gray-700 border-b">
                    {["Date","Device","Location","Status"].map(h => <th key={h} className="py-2 text-left">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, idx) => (
                    <tr key={idx} className="border-b hover:bg-[#f3f2ed]">
                      <td className="py-2">{log.date}</td>
                      <td>{log.device}</td>
                      <td>{log.location}</td>
                      <td className={log.color}>{log.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          {/* Right Side Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold mb-4 text-xl text-[#1b3a57]">Profile Details</h3>

              {profileFields.map(field => (
                <div key={field}>
                  <label className="text-sm text-gray-600 mt-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    value={data[field]}
                    disabled={!edit}
                    onChange={e => setData({...data, [field]: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#1b3a57]"
                  />
                </div>
              ))}

              {edit && (
                <div className="flex gap-3 mt-3">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    onClick={() => { setData({...data, avatar}); setEdit(false); }}>
                    Save
                  </button>
                  <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                    onClick={() => { setAvatar(data.avatar); setEdit(false); }}>
                    Cancel
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
