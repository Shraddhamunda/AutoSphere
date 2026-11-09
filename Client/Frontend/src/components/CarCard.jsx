import { Link } from "react-router-dom";
import { Fuel, Gauge, CalendarDays, ArrowUpRight } from "lucide-react";

function CarCard({ car }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition duration-300 hover:-translate-y-2 hover:border-amber-400/50">

      {/* Car Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <span className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-950">
          New Arrival
        </span>
      </div>

      {/* Car Information */}
      <div className="p-5">
        <p className="text-sm text-amber-400">{car.brand}</p>

        <h3 className="mt-1 text-xl font-bold text-white">
          {car.name}
        </h3>

        <p className="mt-3 text-2xl font-bold text-white">
          ₹{car.price.toLocaleString("en-IN")}
        </p>

        {/* Specifications */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-y border-white/10 py-4">

          <div className="text-center">
            <Fuel className="mx-auto mb-2 text-amber-400" size={18} />
            <p className="text-xs text-slate-400">{car.fuel}</p>
          </div>

          <div className="text-center">
            <Gauge className="mx-auto mb-2 text-amber-400" size={18} />
            <p className="text-xs text-slate-400">{car.transmission}</p>
          </div>

          <div className="text-center">
            <CalendarDays className="mx-auto mb-2 text-amber-400" size={18} />
            <p className="text-xs text-slate-400">{car.year}</p>
          </div>

        </div>

        {/* Details Button */}
        <Link
          to={`/cars/${car.id}`}
          className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-amber-400 px-4 py-3 font-semibold text-amber-400 transition hover:bg-amber-400 hover:text-slate-950"
        >
          View Details
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default CarCard;