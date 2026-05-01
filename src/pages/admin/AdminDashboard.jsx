// import { useEffect, useState } from 'react';
// import AdminLayout from './AdminLayout';

// export default function AdminDashboard() {
//   const [data, setData] = useState({
//     stats: { total: 0, pending: 0, underReview: 0, assigned: 0, resolved: 0 },
//     recentComplaints: [],
//   });
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     fetch('/api/admin/dashboard', {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to load admin dashboard.');
//         return res.json();
//       })
//       .then(setData)
//       .catch((err) => setError(err.message));
//   }, []);

//   const cards = [
//     { label: 'Total Complaints', value: data.stats.total, color: '#f97316' },
//     { label: 'Pending', value: data.stats.pending, color: '#f59e0b' },
//     { label: 'Under Review', value: data.stats.underReview, color: '#3b82f6' },
//     { label: 'Assigned', value: data.stats.assigned, color: '#1d4ed8' },
//     { label: 'Resolved', value: data.stats.resolved, color: '#14863e' },
//   ];

//   return (
//     <AdminLayout>
//       <div style={{ fontFamily: "'Segoe UI', sans-serif", color: '#1f2937' }}>
//         <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '18px', color: '#1b3a57' }}>Admin Dashboard</h1>
//         {error ? <p style={{ color: '#b91c1c', marginBottom: '12px' }}>{error}</p> : null}

//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '18px' }}>
//           {cards.map((card) => (
//             <div key={card.label} style={{ background: card.color, color: 'white', borderRadius: '12px', padding: '14px 16px' }}>
//               <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{card.label}</div>
//               <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{card.value}</div>
//             </div>
//           ))}
//         </div>

//         <div style={{ background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
//           <h2 style={{ marginTop: 0, color: '#1b3a57' }}>Recent Complaints</h2>
//           <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
//             <thead>
//               <tr style={{ background: '#f9fafb' }}>
//                 {['ID', 'Title', 'Citizen', 'Department', 'Status', 'Date'].map((h) => (
//                   <th key={h} style={{ textAlign: 'left', padding: '10px 12px' }}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.recentComplaints.map((c) => (
//                 <tr key={c.COMPLAINT_ID} style={{ borderBottom: '1px solid #f3f4f6' }}>
//                   <td style={{ padding: '10px 12px' }}>{c.COMPLAINT_ID}</td>
//                   <td style={{ padding: '10px 12px' }}>{c.TITLE}</td>
//                   <td style={{ padding: '10px 12px' }}>{c.CITIZEN_NAME}</td>
//                   <td style={{ padding: '10px 12px' }}>{c.DEPARTMENT}</td>
//                   <td style={{ padding: '10px 12px' }}>{c.STATUS}</td>
//                   <td style={{ padding: '10px 12px' }}>{c.DATE_FILED}</td>
//                 </tr>
//               ))}
//               {data.recentComplaints.length === 0 ? (
//                 <tr><td colSpan={6} style={{ padding: '12px', textAlign: 'center', color: '#6b7280' }}>No complaints found.</td></tr>
//               ) : null}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }


import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';

export default function AdminDashboard() {
  const [data, setData] = useState({
    stats: { total: 0, pending: 0, inProgress: 0, resolved: 0, closed: 0 },
    recentComplaints: [],
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load admin dashboard.');
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  const cards = [
    { label: 'Total Complaints', value: data.stats.total, color: '#f97316' },
    { label: 'Pending', value: data.stats.pending, color: '#f59e0b' },
    { label: 'In Progress', value: data.stats.inProgress, color: '#3b82f6' },
    { label: 'Resolved', value: data.stats.resolved, color: '#14863e' },
    { label: 'Closed', value: data.stats.closed, color: '#475569' },
  ];

  return (
    <AdminLayout>
      <div style={{ fontFamily: "'Segoe UI', sans-serif", color: '#1f2937' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '18px', color: '#1b3a57' }}>Admin Dashboard</h1>
        {error ? <p style={{ color: '#b91c1c', marginBottom: '12px' }}>{error}</p> : null}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '18px' }}>
          {cards.map((card) => (
            <div key={card.label} style={{ background: card.color, color: 'white', borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{card.label}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{card.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '14px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
          <h2 style={{ marginTop: 0, color: '#1b3a57' }}>Recent Complaints</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                {['ID', 'Title', 'Citizen', 'Department', 'Status', 'Date'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 12px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.recentComplaints.map((c) => (
                <tr key={c.COMPLAINT_ID} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 12px' }}>{c.COMPLAINT_ID}</td>
                  <td style={{ padding: '10px 12px' }}>{c.TITLE}</td>
                  <td style={{ padding: '10px 12px' }}>{c.CITIZEN_NAME}</td>
                  <td style={{ padding: '10px 12px' }}>{c.DEPARTMENT}</td>
                  <td style={{ padding: '10px 12px' }}>{c.STATUS}</td>
                  <td style={{ padding: '10px 12px' }}>{c.DATE_FILED}</td>
                </tr>
              ))}
              {data.recentComplaints.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '12px', textAlign: 'center', color: '#6b7280' }}>No complaints found.</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
