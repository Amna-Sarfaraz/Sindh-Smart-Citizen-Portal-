import React from 'react';
import { mockData } from '../mockData';
import Card from '../components/ui/Card';
import bgImg from "../assets/bg.png";
import { Zap, Droplets, Flame } from "lucide-react";
import DashboardLayout from "../Pages/DashboardLayout";

const departments = [
  {
    name: "K-Electric (KE)",
    icon: Zap,
    complaints: mockData.stats.totalComplaints,
    description: "Electricity supply & distribution",
    url: "https://ke.com.pk/",
  },
  {
    name: "SSGC",
    icon: Flame,
    complaints: mockData.stats.totalComplaints,
    description: "Gas supply & distribution",
    url: "https://www.ssgc.com.pk/",
  },
  {
    name: "Water Board",
    icon: Droplets,
    complaints: mockData.stats.totalComplaints,
    description: "Water supply & sewerage services",
    url: "https://www.kwsc.gos.pk/",
  },
  
];

const Departments = () => {
  return (
    <DashboardLayout>
    <div className="min-h-screen bg-surface-50  "
>

      {/* Header */}
      <header className="bg-gradient-to-br from-auth-start to-auth-end p-10 text-white shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Departments
          </h1>
        </div>
      </header>

      {/* Department Cards */}
      <main className="container mx-auto px-4 py-12" style={{ backgroundImage: `url(${bgImg})` }}>

        <p className="mb-8 mx-auto max-w-4xl text-lg text-surface-600 italic">
  "These departments are responsible for managing key city utilities such as electricity, 
  gas, and water supply. Citizens can submit service-related complaints through the 
  Smart City Complaint Portal".
</p>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">

          {departments.map((dept) => (
            <a
              key={dept.name}
              href={dept.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[var(--radius-card)] border border-surface-200 bg-white p-6 text-center shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-xl hover: from-auth-start"
            >

              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100  from-auth-start transition-colors group-hover: from-auth-start group-hover:text-white">
                <dept.icon className="h-8 w-8" />
              </div>

              <h3 className="text-lg font-semibold text-surface-800">
                {dept.name}
              </h3>

              <p className="mt-1 text-sm text-surface-500">
                {dept.description}
              </p>

              <div className="mt-4 rounded-md bg-brand-50 px-3 py-2">
                <span className="text-2xl font-bold from-auth-start">
                  {dept.complaints.toLocaleString()}
                </span>
                <p className="text-xs text-surface-500">
                  Total Complaints
                </p>
              </div>

            </a>
          ))}

        </div>

      </main>

    </div>
    </DashboardLayout>
  );
};

export default Departments;