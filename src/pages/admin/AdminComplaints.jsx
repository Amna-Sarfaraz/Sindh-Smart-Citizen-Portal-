// import { useEffect, useMemo, useState } from 'react';
// import AdminLayout from './AdminLayout';

// const STATUSES = ['Pending', 'Under Review', 'Assigned', 'Resolved', 'Rejected'];

// export default function AdminComplaints() {
//   const token = localStorage.getItem('token');
//   const [complaints, setComplaints] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [officers, setOfficers] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [filters, setFilters] = useState({ status: '', search: '', dept_id: '' });
//   const [form, setForm] = useState({ status: '', officer_id: '', admin_remarks: '' });

//   function loadData() {
//     const q = new URLSearchParams();
//     if (filters.status) q.set('status', filters.status);
//     if (filters.search) q.set('search', filters.search);
//     if (filters.dept_id) q.set('dept_id', filters.dept_id);

//     fetch(`/api/admin/complaints?${q.toString()}`, { headers: { Authorization: `Bearer ${token}` } })
//       .then((r) => r.json())
//       .then((data) => setComplaints(Array.isArray(data) ? data : []));
//   }

//   useEffect(() => { loadData(); }, [filters.status, filters.search, filters.dept_id]);
//   useEffect(() => {
//     fetch('/api/admin/departments', { headers: { Authorization: `Bearer ${token}` } })
//       .then((r) => r.json())
//       .then((d) => setDepartments(Array.isArray(d) ? d : []));
//   }, []);

//   useEffect(() => {
//     if (!selected?.COMPLAINT_ID) return;
//     fetch(`/api/admin/complaints/${selected.COMPLAINT_ID}`, { headers: { Authorization: `Bearer ${token}` } })
//       .then((r) => r.json())
//       .then((detail) => {
//         setSelected(detail);
//         setForm({
//           status: detail.STATUS || 'Pending',
//           officer_id: detail.OFFICER_ID || '',
//           admin_remarks: detail.ADMIN_REMARKS || '',
//         });
//       });
//   }, [selected?.COMPLAINT_ID]);

//   const deptOfficers = useMemo(() => officers.filter((o) => Number(o.DEPT_ID) === Number(selected?.DEPT_ID)), [officers, selected?.DEPT_ID]);

//   useEffect(() => {
//     if (!selected?.DEPT_ID) return;
//     fetch(`/api/admin/officers?dept_id=${selected.DEPT_ID}`, { headers: { Authorization: `Bearer ${token}` } })
//       .then((r) => r.json())
//       .then((d) => setOfficers(Array.isArray(d) ? d : []));
//   }, [selected?.DEPT_ID]);

//   async function saveUpdate() {
//     if (!selected?.COMPLAINT_ID) return;
//     await fetch(`/api/admin/complaints/${selected.COMPLAINT_ID}`, {
//       method: 'PUT',
//       headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });
//     loadData();
//   }

//   async function openDocument(docId) {
//     const res = await fetch(`/api/admin/documents/${docId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     if (!res.ok || !data?.file_data) return;
//     const w = window.open();
//     if (w) {
//       w.document.write(`<iframe src="data:application/octet-stream;base64,${data.file_data}" style="width:100%;height:100%;border:0;"></iframe>`);
//     }
//   }

//   return (
//     <AdminLayout>
//       <h1 style={{ color: '#1b3a57' }}>Complaint Management</h1>
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '12px' }}>
//         <input placeholder="Search title/citizen" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
//         <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
//           <option value="">All Statuses</option>
//           {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
//         </select>
//         <select value={filters.dept_id} onChange={(e) => setFilters({ ...filters, dept_id: e.target.value })}>
//           <option value="">All Departments</option>
//           {departments.map((d) => <option key={d.DEPT_ID} value={d.DEPT_ID}>{d.DEPT_NAME}</option>)}
//         </select>
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '16px' }}>
//         <div style={{ background: 'white', borderRadius: '12px', padding: '12px' }}>
//           <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
//             <thead><tr>{['ID', 'Title', 'Citizen', 'Dept', 'Status'].map((h) => <th key={h} style={{ textAlign: 'left', padding: '8px' }}>{h}</th>)}</tr></thead>
//             <tbody>
//               {complaints.map((c) => (
//                 <tr key={c.COMPLAINT_ID} style={{ cursor: 'pointer' }} onClick={() => setSelected(c)}>
//                   <td style={{ padding: '8px' }}>{c.COMPLAINT_ID}</td>
//                   <td style={{ padding: '8px' }}>{c.TITLE}</td>
//                   <td style={{ padding: '8px' }}>{c.CITIZEN_NAME}</td>
//                   <td style={{ padding: '8px' }}>{c.DEPARTMENT}</td>
//                   <td style={{ padding: '8px' }}>{c.STATUS}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div style={{ background: 'white', borderRadius: '12px', padding: '14px' }}>
//           <h3 style={{ marginTop: 0, color: '#1b3a57' }}>Complaint Details</h3>
//           {!selected ? <p>Select a complaint.</p> : (
//             <>
//               <p><strong>Title:</strong> {selected.TITLE}</p>
//               <p><strong>Citizen:</strong> {selected.CITIZEN_NAME}</p>
//               <p><strong>Department:</strong> {selected.DEPARTMENT}</p>
//               <p><strong>Description:</strong> {selected.DESCRIPTION || '—'}</p>
//               <label>Status</label>
//               <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={{ width: '100%', marginBottom: '8px' }}>
//                 {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
//               </select>
//               <label>Assign Officer</label>
//               <select value={form.officer_id} onChange={(e) => setForm({ ...form, officer_id: e.target.value })} style={{ width: '100%', marginBottom: '8px' }}>
//                 <option value="">Not Assigned</option>
//                 {deptOfficers.map((o) => <option key={o.OFFICER_ID} value={o.OFFICER_ID}>{o.OFFICER_NAME}</option>)}
//               </select>
//               <label>Admin Remarks</label>
//               <textarea value={form.admin_remarks} onChange={(e) => setForm({ ...form, admin_remarks: e.target.value })} style={{ width: '100%', minHeight: '80px' }} />
//               <button onClick={saveUpdate} style={{ marginTop: '10px', background: '#1b3a57', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px' }}>Save Changes</button>

//               <h4 style={{ marginBottom: '8px', marginTop: '14px' }}>Documents</h4>
//               {(selected.documents || []).map((d) => (
//                 <button key={d.DOC_ID} onClick={() => openDocument(d.DOC_ID)} style={{ display: 'block', border: 'none', background: 'none', color: '#1d4ed8', padding: 0, cursor: 'pointer' }}>
//                   {d.FILE_NAME}
//                 </button>
//               ))}
//             </>
//           )}
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }


import { useEffect, useMemo, useState } from 'react';
import AdminLayout from './AdminLayout';

const STATUSES = ['Pending', 'In Progress', 'Resolved', 'Closed'];

function getMimeType(fileName = '') {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const types = {
    pdf: 'application/pdf',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    webp: 'image/webp',
    txt: 'text/plain',
  };
  return types[ext] || 'application/octet-stream';
}

function base64ToBlob(base64, mimeType) {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mimeType });
}

export default function AdminComplaints() {
  const token = localStorage.getItem('token');
  const [complaints, setComplaints] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({ status: '', search: '', dept_id: '' });
  const [form, setForm] = useState({ status: '', officer_id: '', admin_remarks: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [detailLoading, setDetailLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function loadData(nextFilters = filters) {
    const q = new URLSearchParams();
    if (nextFilters.status) q.set('status', nextFilters.status);
    if (nextFilters.search) q.set('search', nextFilters.search);
    if (nextFilters.dept_id) q.set('dept_id', nextFilters.dept_id);

    try {
      const res = await fetch(`/api/admin/complaints?${q.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => []);
      if (!res.ok) throw new Error(data?.message || 'Could not load complaints.');
      setComplaints(Array.isArray(data) ? data : []);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      setError(err.message);
      return [];
    }
  }

  useEffect(() => {
    loadData();
  }, [filters.status, filters.search, filters.dept_id]);

  useEffect(() => {
    fetch('/api/admin/departments', { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        const data = await res.json().catch(() => []);
        if (!res.ok) throw new Error(data?.message || 'Could not load departments.');
        return data;
      })
      .then((data) => setDepartments(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!selected?.COMPLAINT_ID) return;
    setDetailLoading(true);
    setError('');
    setMessage('');

    fetch(`/api/admin/complaints/${selected.COMPLAINT_ID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const detail = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(detail?.details || detail?.message || 'Could not load complaint detail.');
        return detail;
      })
      .then((detail) => {
        setSelected(detail);
        setForm({
          status: detail.STATUS || 'Pending',
          officer_id: detail.OFFICER_ID || '',
          admin_remarks: detail.ADMIN_REMARKS || '',
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setDetailLoading(false));
  }, [selected?.COMPLAINT_ID]);

  useEffect(() => {
    if (!selected?.DEPT_ID) return;
    fetch(`/api/admin/officers?dept_id=${selected.DEPT_ID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json().catch(() => []);
        if (!res.ok) throw new Error(data?.message || 'Could not load officers.');
        return data;
      })
      .then((data) => setOfficers(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message));
  }, [selected?.DEPT_ID]);

  const deptOfficers = useMemo(
    () => officers.filter((officer) => Number(officer.DEPT_ID) === Number(selected?.DEPT_ID)),
    [officers, selected?.DEPT_ID],
  );

  async function saveUpdate() {
    if (!selected?.COMPLAINT_ID) return;
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/complaints/${selected.COMPLAINT_ID}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Could not update complaint.');

      const updatedSelected = { ...selected, ...(data?.complaint || {}), ADMIN_REMARKS: form.admin_remarks };
      setSelected(updatedSelected);
      setForm({
        status: updatedSelected.STATUS || 'Pending',
        officer_id: updatedSelected.OFFICER_ID || '',
        admin_remarks: updatedSelected.ADMIN_REMARKS || '',
      });
      setComplaints((current) => current.map((complaint) => (
        complaint.COMPLAINT_ID === updatedSelected.COMPLAINT_ID ? { ...complaint, ...updatedSelected } : complaint
      )));
      setMessage(data?.message || 'Complaint updated successfully.');
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function openDocument(docId) {
    setError('');
    try {
      const res = await fetch(`/api/admin/documents/${docId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Could not open document.');
      if (!data?.file_data) throw new Error('Document data is empty.');

      const fileName = data.file_name || 'document';
      const mimeType = getMimeType(fileName);
      const blob = base64ToBlob(data.file_data, mimeType);
      const url = URL.createObjectURL(blob);
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      if (!opened) {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
      }
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AdminLayout>
      <h1 style={{ color: '#1b3a57' }}>Complaint Management</h1>
      {error ? <p style={{ color: '#b91c1c', marginTop: 0 }}>{error}</p> : null}
      {message ? <p style={{ color: '#14863e', marginTop: 0 }}>{message}</p> : null}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '12px' }}>
        <input placeholder="Search title/citizen" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Statuses</option>
          {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
        <select value={filters.dept_id} onChange={(e) => setFilters({ ...filters, dept_id: e.target.value })}>
          <option value="">All Departments</option>
          {departments.map((department) => (
            <option key={department.DEPT_ID} value={department.DEPT_ID}>{department.DEPT_NAME}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(460px, 560px)', gap: '16px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
            <thead>
              <tr>{['ID', 'Title', 'Citizen', 'Dept', 'Status'].map((heading) => <th key={heading} style={{ textAlign: 'left', padding: '8px' }}>{heading}</th>)}</tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.COMPLAINT_ID} style={{ cursor: 'pointer' }} onClick={() => setSelected(complaint)}>
                  <td style={{ padding: '8px' }}>{complaint.COMPLAINT_ID}</td>
                  <td style={{ padding: '8px' }}>{complaint.TITLE}</td>
                  <td style={{ padding: '8px' }}>{complaint.CITIZEN_NAME}</td>
                  <td style={{ padding: '8px' }}>{complaint.DEPARTMENT}</td>
                  <td style={{ padding: '8px' }}>{complaint.STATUS}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', padding: '14px', maxHeight: 'calc(100vh - 170px)', overflowY: 'auto' }}>
          <h3 style={{ marginTop: 0, color: '#1b3a57' }}>Complaint Details</h3>
          {!selected ? <p>Select a complaint.</p> : detailLoading ? <p>Loading complaint detail...</p> : (
            <>
              <section style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '12px' }}>
                <h4 style={{ margin: '0 0 8px', color: '#1b3a57' }}>Complaint</h4>
                <p><strong>ID:</strong> {selected.COMPLAINT_ID}</p>
                <p><strong>Title:</strong> {selected.TITLE}</p>
                <p><strong>Department:</strong> {selected.DEPARTMENT}</p>
                <p><strong>Status:</strong> {selected.STATUS}</p>
                <p><strong>Officer:</strong> {selected.OFFICER_NAME || 'Not Assigned'}</p>
                <p><strong>Filed On:</strong> {selected.DATE_FILED || '-'}</p>
                <p><strong>Resolved On:</strong> {selected.DATE_RESOLVED || '-'}</p>
                <p style={{ whiteSpace: 'pre-wrap' }}><strong>Description:</strong><br />{selected.DESCRIPTION || '-'}</p>
              </section>

              <section style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '12px' }}>
                <h4 style={{ margin: '0 0 8px', color: '#1b3a57' }}>Citizen</h4>
                <p><strong>Name:</strong> {selected.CITIZEN_NAME || '-'}</p>
                <p><strong>Email:</strong> {selected.CITIZEN_EMAIL || '-'}</p>
                <p><strong>CNIC:</strong> {selected.CITIZEN_CNIC || '-'}</p>
                <p><strong>Phone:</strong> {selected.CITIZEN_PHONE || '-'}</p>
                <p style={{ whiteSpace: 'pre-wrap' }}><strong>Address:</strong><br />{selected.CITIZEN_ADDRESS || '-'}</p>
              </section>

              <section style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '12px' }}>
                <h4 style={{ margin: '0 0 8px', color: '#1b3a57' }}>Attachments</h4>
                {(selected.documents || []).map((document) => (
                  <button key={document.DOC_ID} onClick={() => openDocument(document.DOC_ID)} style={{ display: 'block', border: '1px solid #bfdbfe', background: '#eff6ff', color: '#1d4ed8', padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', marginBottom: '8px', width: '100%', textAlign: 'left' }}>
                    {document.FILE_NAME || `Document ${document.DOC_ID}`}
                  </button>
                ))}
                {(selected.documents || []).length === 0 ? <p style={{ color: '#64748b' }}>No documents attached.</p> : null}
              </section>

              <h4 style={{ margin: '0 0 8px', color: '#1b3a57' }}>Admin Action</h4>
              <label>Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={{ width: '100%', marginBottom: '8px' }}>
                {STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>

              <label>Assign Officer</label>
              <select value={form.officer_id} onChange={(e) => setForm({ ...form, officer_id: e.target.value })} style={{ width: '100%', marginBottom: '8px' }}>
                <option value="">Not Assigned</option>
                {deptOfficers.map((officer) => <option key={officer.OFFICER_ID} value={officer.OFFICER_ID}>{officer.OFFICER_NAME}</option>)}
              </select>

              <label>Admin Remarks</label>
              <textarea value={form.admin_remarks} onChange={(e) => setForm({ ...form, admin_remarks: e.target.value })} style={{ width: '100%', minHeight: '80px' }} />
              <button disabled={saving} onClick={saveUpdate} style={{ marginTop: '10px', background: saving ? '#64748b' : '#1b3a57', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
