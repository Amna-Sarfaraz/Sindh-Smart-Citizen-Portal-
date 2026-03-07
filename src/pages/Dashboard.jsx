import React from 'react';
import { mockData } from '../mockData';
import MetricCard from '../components/ui/MetricCard';

function Dashboard() {
  const user = mockData.currentUser;

  return (
    <div>
      <div className="mb-8 flex items-center gap-6">
        <img src={user.avatar} alt="User Avatar" className="h-20 w-20 rounded-full border-4 border-brand-600 object-cover" />
        <div>
          <h2 className="text-2xl font-bold text-surface-900">Welcome, {user.name}</h2>
          <p className="text-surface-600">{user.email}</p>
        </div>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-3">
        <MetricCard value={mockData.stats.totalComplaints} label="Complaints Filed" />
        <MetricCard value={mockData.stats.resolvedComplaints} label="Actions Taken" />
        <MetricCard value={mockData.stats.activeProperties} label="Assigned Units" />
      </div>

      <section>
        <h3 className="text-xl font-semibold text-surface-900">Upcoming Notifications</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-surface-700">
          <li>Complaint #{mockData.complaints[0].id.substring(0, 8)} status updated to {mockData.complaints[0].status}</li>
          <li>New property maintenance scheduled for tomorrow.</li>
          <li>System update complete.</li>
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
