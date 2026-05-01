import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';

export default function AdminOfficers() {
  const token = localStorage.getItem('token');
  const [officers, setOfficers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ officer_name: '', dept_id: '' });
  const [editId, setEditId] = useState(null);

  function loadOfficers() {
    fetch('/api/admin/officers', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => setOfficers(Array.isArray(d) ? d : []));
  }

  useEffect(() => {
    loadOfficers();
    fetch('/api/admin/departments', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => setDepartments(Array.isArray(d) ? d : []));
  }, []);

  async function save() {
    const url = editId ? `/api/admin/officers/${editId}` : '/api/admin/officers';
    const method = editId ? 'PUT' : 'POST';
    await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ officer_name: '', dept_id: '' });
    setEditId(null);
    loadOfficers();
  }

  return (
    <AdminLayout>
      <h1 style={{ color: '#1b3a57' }}>Officer Management</h1>
      <div style={{ background: 'white', borderRadius: '12px', padding: '14px', marginBottom: '12px' }}>
        <h3 style={{ marginTop: 0 }}>{editId ? 'Edit Officer' : 'Add Officer'}</h3>
        <input placeholder="Officer name" value={form.officer_name} onChange={(e) => setForm({ ...form, officer_name: e.target.value })} />
        <select value={form.dept_id} onChange={(e) => setForm({ ...form, dept_id: e.target.value })} style={{ marginLeft: '8px' }}>
          <option value="">Select Department</option>
          {departments.map((d) => <option key={d.DEPT_ID} value={d.DEPT_ID}>{d.DEPT_NAME}</option>)}
        </select>
        <button onClick={save} style={{ marginLeft: '8px' }}>{editId ? 'Update' : 'Add'}</button>
      </div>
      <div style={{ background: 'white', borderRadius: '12px', padding: '14px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['ID', 'Name', 'Department', 'Action'].map((h) => <th key={h} style={{ textAlign: 'left', padding: '8px' }}>{h}</th>)}</tr></thead>
          <tbody>
            {officers.map((o) => (
              <tr key={o.OFFICER_ID}>
                <td style={{ padding: '8px' }}>{o.OFFICER_ID}</td>
                <td style={{ padding: '8px' }}>{o.OFFICER_NAME}</td>
                <td style={{ padding: '8px' }}>{o.DEPT_NAME}</td>
                <td style={{ padding: '8px' }}>
                  <button onClick={() => { setEditId(o.OFFICER_ID); setForm({ officer_name: o.OFFICER_NAME, dept_id: o.DEPT_ID }); }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
