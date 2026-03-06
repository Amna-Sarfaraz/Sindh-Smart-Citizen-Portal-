import React from 'react';
import { mockData } from '../mockData';

function Dashboard() {
    const user = mockData.currentUser;

    return (
        <div className="page">
            <div className="dashboard-header">
                <img src={user.avatar} alt="User Avatar" className="avatar" />
                <div>
                    <h2>Welcome, {user.name}</h2>
                    <p>{user.email}</p>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>{mockData.stats.totalComplaints}</h3>
                    <p>Complaints Filed</p>
                </div>
                <div className="stat-card">
                    <h3>{mockData.stats.resolvedComplaints}</h3>
                    <p>Actions Taken</p>
                </div>
                <div className="stat-card">
                    <h3>{mockData.stats.activeProperties}</h3>
                    <p>Assigned Units</p>
                </div>
            </div>

            <section>
                <h3>Upcoming Notifications</h3>
                <ul>
                    <li>Complaint #{mockData.complaints[0].id.substring(0, 8)} status updated to {mockData.complaints[0].status}</li>
                    <li>New property maintenance scheduled for tomorrow.</li>
                    <li>System update complete.</li>
                </ul>
            </section>
        </div>
    );
}

export default Dashboard;
