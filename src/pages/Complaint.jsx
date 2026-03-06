import React from 'react';

const timeline = [
  { id: 1, label: 'Submitted', done: true },
  { id: 2, label: 'Under Review', done: false },
  { id: 3, label: 'Assigned to Officer', done: false },
  { id: 4, label: 'Resolved', done: true },
];

const complaints = [
  { id: 'CMP-10234', department: 'KE', date: '12-Jan-2022', status: 'Pending', officer: 'Not Assigned' },
  { id: 'CMP-10567', department: 'SSGC', date: '25-Feb-2022', status: 'In Progress', officer: 'Ali Ahmed' },
  { id: 'CMP-09876', department: 'NADRA', date: '10-Mar-2022', status: 'Resolved', officer: 'Sara Khan' },
  { id: 'CMP-11245', department: 'Excise', date: '05-Apr-2022', status: 'In Progress', officer: 'Zubair Malik' },
  { id: 'CMP-08765', department: 'Passport', date: '20-May-2022', status: 'Resolved', officer: 'Not Assigned' },
];

function Complaint() {
  return (
    <div className="complaint-portal">
      <header className="portal-topbar">
        <div className="portal-brand">
          <div className="portal-brand-mark">SSCP</div>
          <div className="portal-brand-text">Sindh Smart Citizen Portal</div>
        </div>
        <div className="portal-search">
          <input type="text" defaultValue="" placeholder="Search" />
        </div>
        <div className="portal-user">ENG</div>
      </header>

      <div className="portal-body">
        <section className="portal-content">
          <h1>Complaints &amp; Issue Management</h1>

          <div className="complaint-top-grid">
            <div className="complaint-card">
              <h2>Submit New Complaint</h2>
              <div className="complaint-form">
                <div className="row">
                  <label htmlFor="department">Department</label>
                  <select id="department" defaultValue="KE">
                    <option>KE</option>
                    <option>SSGC</option>
                    <option>NADRA</option>
                    <option>Excise</option>
                    <option>Passport</option>
                  </select>
                </div>
                <div className="row">
                  <label htmlFor="subject">Subject</label>
                  <input id="subject" type="text" defaultValue="" />
                </div>
                <div className="row">
                  <label htmlFor="desc">Complaint Description</label>
                  <textarea id="desc" defaultValue="" />
                </div>
                <div className="row buttons-row">
                  <button type="button" className="upload-btn">Upload Document</button>
                  <button type="button" className="submit-btn">Submit Complaint</button>
                </div>
              </div>
            </div>

            <div className="timeline-card">
              <h2>Complaint Timeline</h2>
              <ul>
                {timeline.map((step) => (
                  <li key={step.id}>
                    <span className={step.done ? 'dot done' : 'dot'} />
                    {step.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="complaint-card complaint-table-card">
            <h2>My Complaints</h2>
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>Department</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Assigned Officer</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.department}</td>
                    <td>{item.date}</td>
                    <td><span className={`status-pill ${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span></td>
                    <td>{item.officer}</td>
                    <td><button type="button" className="view-btn">View Details</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Complaint;
