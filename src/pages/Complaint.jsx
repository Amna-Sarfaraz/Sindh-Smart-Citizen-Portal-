import React from 'react';
import { mockData } from '../mockData';

function Complaint() {
    return (
        <div className="page">
            <h2>Report an Issue</h2>
            <div className="form-container" style={{ marginBottom: '2rem' }}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Subject</label>
                        <input type="text" defaultValue="Leaking water pipe in Sector 4" />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea defaultValue="There is a major water leak near the main junction. It has been flowing for over 2 hours."></textarea>
                    </div>
                    <button type="submit">Submit Complaint</button>
                </form>
            </div>

            <h2>Your Recent Complaints</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Subject</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {mockData.complaints.map(complaint => (
                        <tr key={complaint.id}>
                            <td>{complaint.date}</td>
                            <td>{complaint.subject}</td>
                            <td><span className={`status-${complaint.status.toLowerCase().replace(' ', '-')}`}>{complaint.status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Complaint;
