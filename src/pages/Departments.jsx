// import React from 'react';
// import { mockData } from '../mockData';
// import Card from '../components/ui/Card';
// import bgImg from "../assets/bg.png";
// import { Zap, Droplets, Flame } from "lucide-react";
// import DashboardLayout from "../Pages/DashboardLayout";

// const departments = [
//   {
//     name: "K-Electric (KE)",
//     icon: Zap,
//     complaints: mockData.stats.totalComplaints,
//     description: "Electricity supply & distribution",
//   },
//   {
//     name: "SSGC",
//     icon: Flame,
//     complaints: mockData.stats.totalComplaints,
//     description: "Gas supply & distribution",
//   },
//   {
//     name: "Water Board",
//     icon: Droplets,
//     complaints: mockData.stats.totalComplaints,
//     description: "Water supply & sewerage services",
//   },
  
// ];

// const Departments = () => {
//   return (
//     <DashboardLayout>
//     <div className="min-h-screen bg-surface-50  "
// >

//       {/* Header */}
//       <header className="bg-gradient-to-br from-auth-start to-auth-end p-10 text-white shadow-lg">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
//             Departments
//           </h1>
//         </div>
//       </header>

//       {/* Department Cards */}
//       <main className="container mx-auto px-4 py-12" style={{ backgroundImage: `url(${bgImg})` }}>

//         <p className="mb-8 mx-auto max-w-4xl text-lg text-surface-600 italic">
//   "These departments are responsible for managing key city utilities such as electricity, 
//   gas, and water supply. Citizens can submit service-related complaints through the 
//   Smart City Complaint Portal".
// </p>

//         <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">

//           {departments.map((dept) => (
//             <a
//               key={dept.name}
//               href={dept.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group rounded-[var(--radius-card)] border border-surface-200 bg-white p-6 text-center shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-xl hover: from-auth-start"
//             >

//               <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100  from-auth-start transition-colors group-hover: from-auth-start group-hover:text-white">
//                 <dept.icon className="h-8 w-8" />
//               </div>

//               <h3 className="text-lg font-semibold text-surface-800">
//                 {dept.name}
//               </h3>

//               <p className="mt-1 text-sm text-surface-500">
//                 {dept.description}
//               </p>

//               <div className="mt-4 rounded-md bg-brand-50 px-3 py-2">
//                 <span className="text-2xl font-bold from-auth-start">
//                   {dept.complaints.toLocaleString()}
//                 </span>
//                 <p className="text-xs text-surface-500">
//                   Total Complaints
//                 </p>
//               </div>

//             </a>
//           ))}

//         </div>

//       </main>

//     </div>
//     </DashboardLayout>
//   );
// };

// export default Departments;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import bgImg from "../assets/bg.png";
import { Zap, Droplets, Flame, Building2 } from "lucide-react";
import DashboardLayout from "../Pages/DashboardLayout";

const API = 'http://localhost:5000/api';

// Map dept names to icons
const iconMap = {
  'KE':         Zap,
  'SSGC':       Flame,
  'Water Board': Droplets,
};
const fallbackIcon = Building2;

const Departments = () => {
  const navigate = useNavigate();
  const user     = JSON.parse(localStorage.getItem('user') || '{}');
  const userId   = user?.user_id;

  const [departments, setDepartments] = useState([]);
  const [counts,      setCounts]      = useState({});   // { dept_id: count }
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    // Fetch departments + user's complaints in parallel
    Promise.all([
      fetch(`${API}/departments`).then(r => r.json()),
      userId
        ? fetch(`${API}/complaints/user/${userId}`).then(r => r.json())
        : Promise.resolve([]),
    ])
      .then(([depts, complaints]) => {
        setDepartments(depts);

        // Count complaints per dept_id from user's complaint list
        const countMap = {};
        complaints.forEach(c => {
          // match by department name since that's what the list API returns
          const dept = depts.find(d => d.DEPT_NAME === c.DEPARTMENT);
          if (dept) {
            countMap[dept.DEPT_ID] = (countMap[dept.DEPT_ID] || 0) + 1;
          }
        });
        setCounts(countMap);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [userId]);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-surface-50">

        {/* Header */}
        <header className="bg-gradient-to-br from-auth-start to-auth-end p-10 text-white shadow-lg">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Departments
            </h1>
          </div>
        </header>

        {/* Cards */}
        <main
          className="container mx-auto px-4 py-12"
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          <p className="mb-8 mx-auto max-w-4xl text-lg text-surface-600 italic">
            "These departments are responsible for managing key city utilities such as electricity,
            gas, and water supply. Citizens can submit service-related complaints through the
            Smart City Complaint Portal."
          </p>

          {loading ? (
            <p className="text-center text-surface-500">Loading departments…</p>
          ) : (
            <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
              {departments.map((dept) => {
                const Icon  = iconMap[dept.DEPT_NAME] ?? fallbackIcon;
                const count = counts[dept.DEPT_ID] ?? 0;

                return (
                  <button
                    key={dept.DEPT_ID}
                    onClick={() => navigate('/complaint')}
                    className="group rounded-[var(--radius-card)] border border-surface-200 bg-white p-6 text-center shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-xl text-left w-full cursor-pointer"
                  >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 transition-colors">
                      <Icon className="h-8 w-8" />
                    </div>

                    <h3 className="text-lg font-semibold text-surface-800 text-center">
                      {dept.DEPT_NAME}
                    </h3>

                    <p className="mt-1 text-sm text-surface-500 text-center">
                      {/* {dept.DEPT_DESCRIPTION ?? 'City utility service'} */}
                    </p>

                    <div className="mt-4 rounded-md bg-brand-50 px-3 py-2 text-center">
                      <span className="text-2xl font-bold text-brand-600">
                        {count.toLocaleString()}
                      </span>
                      <p className="text-xs text-surface-500">My Complaints</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </main>

      </div>
    </DashboardLayout>
  );
};

export default Departments;