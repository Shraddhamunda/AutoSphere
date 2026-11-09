import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "LOST"];

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await api.get("/leads");
      setLeads(res.data.leads || []);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/leads/${id}`, { status });
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === id ? { ...lead, status } : lead
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
              AutoSphere CRM
            </p>
            <h1 className="mt-2 text-3xl font-bold">Leads Dashboard</h1>
            <p className="mt-2 text-slate-400">
              Manage customer enquiries and track their progress.
            </p>
          </div>

          <button
            onClick={fetchLeads}
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Refresh Leads
          </button>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-slate-400">Total Leads</p>
            <h2 className="mt-2 text-3xl font-bold">{leads.length}</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-slate-400">New Leads</p>
            <h2 className="mt-2 text-3xl font-bold">
              {leads.filter((l) => l.status === "NEW").length}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-slate-400">Converted Leads</p>
            <h2 className="mt-2 text-3xl font-bold">
              {leads.filter((l) => l.status === "CONVERTED").length}
            </h2>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-xl font-semibold">Customer Enquiries</h2>
          </div>

          {loading ? (
            <p className="p-8 text-slate-400">Loading leads...</p>
          ) : error ? (
            <p className="p-8 text-red-400">{error}</p>
          ) : leads.length === 0 ? (
            <p className="p-8 text-slate-400">No leads found yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-sm text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Message</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Assigned To</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-t border-white/10">
                      <td className="px-6 py-5 font-medium">{lead.name}</td>
                      <td className="px-6 py-5 text-sm text-slate-300">
                        <p>{lead.email}</p>
                        <p>{lead.phone}</p>
                      </td>
                      <td className="max-w-xs px-6 py-5 text-sm text-slate-400">
                        {lead.message || "No message"}
                      </td>
                      <td className="px-6 py-5">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(lead.id, e.target.value)
                          }
                          className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-400">
                        {lead.assignedTo?.name || "Unassigned"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}