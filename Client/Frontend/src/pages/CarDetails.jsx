import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import cars from "../data/cars.js";
import {
  Fuel,
  Gauge,
  CalendarDays,
  ArrowLeft,
  CheckCircle
} from "lucide-react";

function CarDetails() {
  const { id } = useParams();

  const car = cars.find((item) => item.id === Number(id));

  if (!car) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="px-6 pt-40 text-center">
          <h1 className="text-3xl font-bold">Car Not Found</h1>
          <Link to="/cars" className="mt-5 inline-block text-amber-400">
            Back to Cars
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-32">

        <Link
          to="/cars"
          className="mb-8 inline-flex items-center gap-2 text-slate-400 hover:text-amber-400"
        >
          <ArrowLeft size={18} />
          Back to Collection
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Car Image */}
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <img
              src={car.image}
              alt={car.name}
              className="h-full min-h-80 max-h-[500px] w-full object-cover"
            />
          </div>

          {/* Car Information */}
          <div>
            <p className="font-semibold uppercase tracking-widest text-amber-400">
              {car.brand}
            </p>

            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
              {car.name}
            </h1>

            <p className="mt-5 text-3xl font-bold text-amber-400">
              ₹{car.price.toLocaleString("en-IN")}
            </p>

            <p className="mt-3 text-slate-400">
              Experience performance, comfort and reliability with the {car.name}.
            </p>

            {/* Specifications */}
            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-xl border border-white/10 bg-slate-900 p-5">
                <Fuel className="mb-3 text-amber-400" />
                <p className="text-sm text-slate-400">Fuel Type</p>
                <p className="mt-1 font-semibold text-white">{car.fuel}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-900 p-5">
                <Gauge className="mb-3 text-amber-400" />
                <p className="text-sm text-slate-400">Transmission</p>
                <p className="mt-1 font-semibold text-white">{car.transmission}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-900 p-5">
                <CalendarDays className="mb-3 text-amber-400" />
                <p className="text-sm text-slate-400">Model Year</p>
                <p className="mt-1 font-semibold text-white">{car.year}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-900 p-5">
                <CheckCircle className="mb-3 text-amber-400" />
                <p className="text-sm text-slate-400">Mileage</p>
                <p className="mt-1 font-semibold text-white">{car.mileage}</p>
              </div>

            </div>

            <Link
              to="/test-drive"
              className="mt-8 flex w-full items-center justify-center rounded-xl bg-amber-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Book a Test Drive
            </Link>

          </div>
        </div>
      </section>
    </main>
  );
}

export default CarDetails;
