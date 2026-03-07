import React from 'react';
import { mockData } from '../mockData';
import MetricCard from '../components/ui/MetricCard';

function Landing() {
  return (
    <div>
      <header className="mb-12 rounded-card bg-gradient-to-br from-brand-600 to-brand-800 px-4 py-16 text-center text-white">
        <h1 className="text-3xl font-bold">{mockData.stats.totalComplaints}+ Problems Solved</h1>
        <p className="mt-2">Smart City Service Complaint Portal (SSCP) - Your voice for a better city.</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-surface-900">Our Impact</h2>
        <div className="mb-12 mt-6 grid gap-6 md:grid-cols-3">
          <MetricCard value={mockData.stats.totalComplaints} label="Total Complaints" />
          <MetricCard value={mockData.stats.resolvedComplaints} label="Resolved" />
          <MetricCard value={mockData.stats.activeProperties} label="Managed Properties" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-surface-900">About SSCP</h2>
        <p className="mt-3 text-surface-600">
          The Smart City Service Complaint Portal is a comprehensive platform designed to streamline communication between citizens and city administration. Our goal is to ensure every issue is tracked, addressed, and resolved efficiently.
        </p>
      </section>
    </div>
  );
}

export default Landing;
