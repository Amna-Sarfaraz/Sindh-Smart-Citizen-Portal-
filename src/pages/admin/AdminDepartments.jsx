import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';

export default function AdminDepartments() {
  const token = localStorage.getItem('token');
  const [departments, setDepartments] = useState([]);
  const [deptName, setDeptName] = useState('');
  const [editId, setEditId] = useState(null);

  function loadDepartments() {
    fetch('/api/admin/departments', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => setDepartments(Array.isArray(d) ? d : []));
  }

  useEffect(() => { loadDepartments(); }, []);

  async function save() {
    const url = editId ? `/api/admin/departments/${editId}` : '/api/admin/departments';
    const method = editId ? 'PUT' : 'POST';
    await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ dept_name: deptName }),
    });
    setDeptName('');
    setEditId(null);
    loadDepartments();
  }

  return (
    <AdminLayout>
      <h1 style={{ color: '#1b3a57' }}>Department Management</h1>
      <div style={{ background: 'white', borderRadius: '12px', padding: '14px', marginBottom: '12px' }}>
        <h3 style={{ marginTop: 0 }}>{editId ? 'Edit Department' : 'Add Department'}</h3>
        <input placeholder="Department name" value={deptName} onChange={(e) => setDeptName(e.target.value)} />
        <button onClick={save} style={{ marginLeft: '8px' }}>{editId ? 'Update' : 'Add'}</button>
      </div>
      <div style={{ background: 'white', borderRadius: '12px', padding: '14px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr>{['ID', 'Name', 'Action'].map((h) => <th key={h} style={{ textAlign: 'left', padding: '8px' }}>{h}</th>)}</tr></thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d.DEPT_ID}>
                <td style={{ padding: '8px' }}>{d.DEPT_ID}</td>
                <td style={{ padding: '8px' }}>{d.DEPT_NAME}</td>
                <td style={{ padding: '8px' }}>
                  <button onClick={() => { setEditId(d.DEPT_ID); setDeptName(d.DEPT_NAME); }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
