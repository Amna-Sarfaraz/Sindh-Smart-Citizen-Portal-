import React from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { SelectInput, TextArea, TextInput } from '../components/ui/FormField';

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

const statusClassMap = {
  Pending: 'bg-amber-400',
  'In Progress': 'bg-brand-500',
  Resolved: 'bg-emerald-600',
};

function Complaint() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-100 via-surface-100 to-surface-200 font-[Segoe_UI,Tahoma,Geneva,Verdana,sans-serif] text-[#15213b]">
      <header className="flex h-[58px] items-center gap-3.5 bg-gradient-to-r from-[#0e376f] to-[#1f4b85] px-4 text-white">
        <div className="flex min-w-[260px] items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#9db8de] text-[0.66rem] font-bold">SSCP</div>
          <div className="hidden text-[0.96rem] font-semibold sm:block">Sindh Smart Citizen Portal</div>
        </div>
        <div className="w-full max-w-[410px] flex-1">
          <input
            type="text"
            defaultValue=""
            placeholder="Search"
            className="h-[34px] w-full rounded-[5px] border border-[#7f9ec9] bg-[#f5f7fb] px-2.5 text-sm text-slate-700 outline-none"
          />
        </div>
        <div className="ml-auto rounded-2xl border border-white/30 bg-white/15 px-3 py-1 text-xs font-bold">ENG</div>
      </header>

      <div className="flex min-h-[calc(100vh-58px)]">
        <section className="flex-1 px-3 py-4 sm:px-5 sm:pb-6">
          <h1 className="mb-3.5 mt-0.5 text-[1.8rem] font-semibold text-[#1e3354]">Complaints &amp; Issue Management</h1>

          <div className="grid items-start gap-3 lg:grid-cols-[1fr_260px]">
            <Card className="rounded-md border-[#d5dce8] px-3.5 py-3 shadow-[0_1px_2px_rgba(12,30,59,0.08)]">
              <h2 className="mb-3 mt-0.5 text-base font-semibold text-[#243c63]">Submit New Complaint</h2>
              <div className="space-y-2.5">
                <div className="grid items-center gap-2 md:grid-cols-[160px_1fr]">
                  <label htmlFor="department" className="text-[0.83rem] font-semibold text-[#314a6f]">Department</label>
                  <SelectInput id="department" defaultValue="KE" className="rounded-[3px] border-[#ccd4e2] px-2 py-1.5 text-[0.83rem] focus:ring-1">
                    <option>KE</option>
                    <option>SSGC</option>
                    <option>NADRA</option>
                    <option>Excise</option>
                    <option>Passport</option>
                  </SelectInput>
                </div>
                <div className="grid items-center gap-2 md:grid-cols-[160px_1fr]">
                  <label htmlFor="subject" className="text-[0.83rem] font-semibold text-[#314a6f]">Subject</label>
                  <TextInput id="subject" type="text" defaultValue="" className="rounded-[3px] border-[#ccd4e2] px-2 py-1.5 text-[0.83rem] focus:ring-1" />
                </div>
                <div className="grid items-center gap-2 md:grid-cols-[160px_1fr]">
                  <label htmlFor="desc" className="text-[0.83rem] font-semibold text-[#314a6f]">Complaint Description</label>
                  <TextArea id="desc" defaultValue="" className="min-h-11 resize-none rounded-[3px] border-[#ccd4e2] px-2 py-1.5 text-[0.83rem] focus:ring-1" />
                </div>
                <div className="grid gap-2 pt-1 md:grid-cols-[1fr_auto] md:items-center">
                  <Button type="button" variant="muted" className="justify-self-start rounded-[3px] border border-[#c8d4e6] bg-[#f6f8fb] px-3 py-1.5 text-sm text-[#254265]">
                    Upload Document
                  </Button>
                  <Button type="button" variant="success" className="rounded-[3px] px-[18px] py-[7px] text-sm">
                    Submit Complaint
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="rounded-md border-[#d5dce8] px-3.5 py-3 shadow-[0_1px_2px_rgba(12,30,59,0.08)]">
              <h2 className="mb-3 mt-0.5 text-base font-semibold text-[#243c63]">Complaint Timeline</h2>
              <ul className="flex list-none flex-col gap-3.5 p-0">
                {timeline.map((step) => (
                  <li key={step.id} className="flex items-center gap-2.5 text-[0.86rem] font-semibold text-[#2c4368]">
                    <span
                      className={step.done
                        ? 'relative h-[13px] w-[13px] rounded-full bg-[#1ca87f]'
                        : 'h-[13px] w-[13px] rounded-full border-[3px] border-[#3f62a1]'}
                    >
                      {step.done && <span className="absolute left-[3px] top-[1px] h-[7px] w-1 rotate-45 border-b-2 border-r-2 border-white" />}
                    </span>
                    {step.label}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="mt-3.5 rounded-md border-[#d5dce8] px-3.5 py-3 shadow-[0_1px_2px_rgba(12,30,59,0.08)]">
            <h2 className="mb-3 mt-0.5 text-base font-semibold text-[#243c63]">My Complaints</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-[#e0e6ef] bg-[#f0f4fa] px-2.5 py-2 text-left text-[0.8rem] font-bold text-[#2e4870]">Complaint ID</th>
                    <th className="border-b border-[#e0e6ef] bg-[#f0f4fa] px-2.5 py-2 text-left text-[0.8rem] font-bold text-[#2e4870]">Department</th>
                    <th className="border-b border-[#e0e6ef] bg-[#f0f4fa] px-2.5 py-2 text-left text-[0.8rem] font-bold text-[#2e4870]">Date</th>
                    <th className="border-b border-[#e0e6ef] bg-[#f0f4fa] px-2.5 py-2 text-left text-[0.8rem] font-bold text-[#2e4870]">Status</th>
                    <th className="border-b border-[#e0e6ef] bg-[#f0f4fa] px-2.5 py-2 text-left text-[0.8rem] font-bold text-[#2e4870]">Assigned Officer</th>
                    <th className="border-b border-[#e0e6ef] bg-[#f0f4fa] px-2.5 py-2 text-left text-[0.8rem] font-bold text-[#2e4870]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((item) => (
                    <tr key={item.id}>
                      <td className="border-b border-[#e0e6ef] px-2.5 py-2 text-[0.8rem]">{item.id}</td>
                      <td className="border-b border-[#e0e6ef] px-2.5 py-2 text-[0.8rem]">{item.department}</td>
                      <td className="border-b border-[#e0e6ef] px-2.5 py-2 text-[0.8rem]">{item.date}</td>
                      <td className="border-b border-[#e0e6ef] px-2.5 py-2 text-[0.8rem]">
                        <span className={`inline-block min-w-[74px] rounded-[3px] px-1.5 py-[3px] text-center text-[0.72rem] font-bold text-white ${statusClassMap[item.status]}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="border-b border-[#e0e6ef] px-2.5 py-2 text-[0.8rem]">{item.officer}</td>
                      <td className="border-b border-[#e0e6ef] px-2.5 py-2 text-[0.8rem]">
                        <Button type="button" className="rounded-[3px] bg-[#2f69b3] px-2 py-[5px] text-[0.72rem] hover:bg-[#255a9b]">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default Complaint;
