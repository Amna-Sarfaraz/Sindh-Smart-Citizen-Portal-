import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import bgImg from "../assets/bg.png";

function getAuthHeaders(extra = {}) {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}`, ...extra } : { ...extra };
}

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [edit, setEdit]       = useState(false);
  const [saving, setSaving]   = useState(false);
  const [message, setMessage] = useState('');
  const [logs, setLogs]       = useState([]);
  const [avatar, setAvatar]   = useState(user.profilepic || null);
  const [complaintStats, setComplaintStats] = useState({
    filed: 0,
    resolved: 0,
    active: 0,
  });

  const [form, setForm] = useState({
    name:     user.full_name   || '',
    father:   user.father_name || '',
    phone:    user.phone       || '',
    email:    user.email       || '',
    address:  user.address     || '',
    district: user.district    || '',
    cnic:     user.cnic        || '',
    dob:      user.dob         || '',
  });

  const today = new Date().toISOString().split('T')[0];

  // Load login logs
  useEffect(() => {
    if (!user.user_id) return;
    fetch(`/api/users/${user.user_id}/logs`, {
      headers: getAuthHeaders(),
    })
      .then(r => r.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        setLogs(data.map(l => ({
          date:     l.DATE_STR   || '—',
          device:   l.DEVICE     || '—',
          location: l.IP_ADDRESS || '—',
          status:   l.STATUS     || '—',
          green:    l.STATUS === 'Success',
        })));
      })
      .catch(() => {});
  }, []);

  // Load complaint stats
  useEffect(() => {
    if (!user.user_id) return;
    fetch(`/api/dashboard/${user.user_id}`, {
      headers: getAuthHeaders(),
    })
      .then(r => r.json())
      .then(data => {
        const stats = data?.stats || {};
        const total = Number(stats.total || 0);
        const resolved = Number(stats.resolved || 0);
        const pending = Number(stats.pending || 0);
        const inProgress = Number(stats.inProgress || 0);

        setComplaintStats({
          filed: total,
          resolved,
          active: pending + inProgress,
        });
      })
      .catch(() => {});
  }, []);

  // Save profile
  async function saveProfile() {
    setSaving(true);
    setMessage('');
    const u = JSON.parse(localStorage.getItem('user') || '{}');

    try {
      const res = await fetch(`/api/users/${u.user_id}`, {
        method: 'PUT',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          full_name:   form.name,
          father_name: form.father,
          phone:       form.phone,
          email:       form.email,
          address:     form.address,
          district:    form.district,
          cnic:        form.cnic,
          dob:         form.dob || null,
          profilepic:  avatar   || null,
        }),
      });

      if (!res.ok) throw new Error('Update failed');

      localStorage.setItem('user', JSON.stringify({
        ...u,
        full_name:   form.name,
        father_name: form.father,
        phone:       form.phone,
        email:       form.email,
        address:     form.address,
        district:    form.district,
        cnic:        form.cnic,
        dob:         form.dob,
        profilepic:  avatar || null,
      }));

      setMessage('Profile saved successfully!');
      setEdit(false);
    } catch (err) {
      setMessage(err.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  }

  // Cancel edit
  function cancelEdit() {
    const u = JSON.parse(localStorage.getItem('user') || '{}');
    setForm({
      name:     u.full_name   || '',
      father:   u.father_name || '',
      phone:    u.phone       || '',
      email:    u.email       || '',
      address:  u.address     || '',
      district: u.district    || '',
      cnic:     u.cnic        || '',
      dob:      u.dob         || '',
    });
    setAvatar(u.profilepic || null);
    setMessage('');
    setEdit(false);
  }

  // Pick image
  function pickImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  }

  const fields = [
    { key: 'name',     label: 'Full Name'     },
    { key: 'father',   label: 'Father Name'   },
    { key: 'phone',    label: 'Phone'         },
    { key: 'email',    label: 'Email'         },
    { key: 'address',  label: 'Address'       },
    { key: 'district', label: 'District'      },
    { key: 'cnic',     label: 'CNIC'          },
    { key: 'dob',      label: 'Date of Birth', type: 'date' },
  ];

  return (
    <DashboardLayout>
      <div className="bg-[#f9f7f1] min-h-screen p-5 font-sans text-gray-800 relative">

        {/* Background image */}
        <div
          className="absolute bottom-0 left-0 w-[1200px] h-[280px] rounded-2xl overflow-hidden"
          style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover' }}
        />

        <div className="relative z-10 flex flex-col gap-6">

          {/* ── Top card ── */}
          <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">

            <div className="flex items-center gap-6">
              {/* Photo */}
              <div className="relative">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="profile"
                    className="w-36 h-36 rounded-full object-cover border-2 border-gray-200 shadow"
                    onError={() => setAvatar(null)}
                  />
                ) : (
                  <div className="w-36 h-36 rounded-full border-2 border-dashed border-gray-300 bg-gray-100 flex flex-col items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span className="text-xs text-gray-400 mt-1">No Photo</span>
                  </div>
                )}
                {edit && (
                  <label className="absolute bottom-1 right-1 bg-[#1b3a57] text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-[#254a78]">
                    Upload
                    <input type="file" accept="image/*" className="hidden" onChange={pickImage} />
                  </label>
                )}
              </div>

              {/* Name + role */}
              <div>
                <h1 className="text-3xl font-bold text-[#1b3a57]">{form.name || 'User'}</h1>
                <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">{user.role || 'USER'}</p>
                <p className="text-gray-600 mt-1">CNIC: {form.cnic || '—'}</p>
              </div>
            </div>

            {!edit && (
              <button
                onClick={() => { setMessage(''); setEdit(true); }}
                className="bg-[#1b3a57] text-white px-6 py-2 rounded-lg hover:bg-[#254a78] font-semibold"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Message */}
          {message && (
            <div className={`rounded-xl px-4 py-3 text-sm font-medium border ${
              message.includes('success')
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              {message}
            </div>
          )}

          {/* ── Two column grid ── */}
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Left column */}
            <div className="flex flex-col gap-6">

              {/* Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-[#1b3a57] border-b pb-2 mb-4">Complaint Stats</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: 'Filed',    count: complaintStats.filed, color: 'text-[#1b3a57]'  },
                    { label: 'Resolved', count: complaintStats.resolved, color: 'text-green-600'  },
                    { label: 'Active',   count: complaintStats.active, color: 'text-orange-500' },
                  ].map(s => (
                    <div key={s.label} className="bg-[#f6f5f1] rounded-xl p-4">
                      <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
                      <p className="text-sm text-gray-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Login logs */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-[#1b3a57] border-b pb-2 mb-3">Security Logs</h3>
                {logs.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">No login history yet.</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f6f5f1] text-gray-600 border-b">
                        <th className="py-2 text-left">Date</th>
                        <th className="text-left">Device</th>
                        <th className="text-left">Location</th>
                        <th className="text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((log, i) => (
                        <tr key={i} className="border-b hover:bg-[#f3f2ed]">
                          <td className="py-2 pr-3">{log.date}</td>
                          <td className="pr-3">{log.device}</td>
                          <td className="pr-3">{log.location}</td>
                          <td className={log.green ? 'text-green-600' : 'text-red-500'}>{log.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Right column — form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-[#1b3a57] mb-4">Profile Details</h3>

              {fields.map(({ key, label, type }) => (
                <div key={key} className="mb-3">
                  <label className="text-sm text-gray-500">{label}</label>
                  <input
                    type={type || 'text'}
                    value={form[key]}
                    disabled={!edit}
                    max={type === 'date' ? today : undefined}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm
                               focus:outline-none focus:ring-2 focus:ring-[#1b3a57]
                               disabled:bg-gray-50 disabled:text-gray-400"
                  />
                </div>
              ))}

              {edit && (
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
