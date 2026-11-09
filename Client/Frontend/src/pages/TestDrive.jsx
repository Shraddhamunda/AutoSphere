import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import cars from "../data/cars";
import api from "../services/api";
import { CalendarDays, MapPin, CheckCircle } from "lucide-react";

function TestDrive() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    carId: "",
    date: "",
    time: "",
    showroom: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/test-drives", {
        ...form,
        carId: Number(form.carId),
      });

      setSuccess("Your test drive request has been submitted!");
      setForm({
        carId: "",
        date: "",
        time: "",
        showroom: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to submit booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      <section className="px-6 pb-16 pt-32">
        <div className="mx-auto max-w-3xl">

          <div className="mb-10 text-center">
            <CalendarDays className="mx-auto mb-4 text-amber-400" size={42} />

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
              Experience Your Next Car
            </p>

            <h1 className="mt-3 text-4xl font-bold text-white">
              Book a Test Drive
            </h1>

            <p className="mt-3 text-slate-400">
              Schedule a convenient time to experience your favourite car.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border border-white/10 bg-slate-900 p-7"
          >

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Select Car
              </label>

              <select
                name="carId"
                value={form.carId}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
              >
                <option value="">Choose a car</option>

                {cars.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Preferred Date
                </label>

                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Preferred Time
                </label>

                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
                />
              </div>

            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                <MapPin size={16} className="text-amber-400" />
                Select Showroom
              </label>

              <select
                name="showroom"
                value={form.showroom}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400"
              >
                <option value="">Choose showroom</option>
                <option value="Lucknow Central">Lucknow Central</option>
                <option value="Gomti Nagar">Gomti Nagar</option>
                <option value="Hazratganj">Hazratganj</option>
              </select>
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </p>
            )}

            {success && (
              <p className="rounded-lg bg-green-500/10 p-3 text-sm text-green-400">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-amber-300 disabled:opacity-50"
            >
              <CheckCircle size={19} />
              {loading ? "Submitting..." : "Confirm Test Drive"}
            </button>

          </form>

          <button
            onClick={() => navigate("/cars")}
            className="mt-6 w-full text-center text-sm text-slate-400 hover:text-amber-400"
          >
            ← Back to Cars
          </button>

        </div>
      </section>
    </main>
  );
}

export default TestDrive;
