
import { useState } from "react";
import Navbar from "../components/Navbar";
import cars from "../data/cars";
import CarCard from "../components/CarCard";
import { Search, RotateCcw } from "lucide-react";

function Cars() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(search.toLowerCase()) ||
      car.brand.toLowerCase().includes(search.toLowerCase());

    const matchesBrand = !brand || car.brand === brand;
    const matchesFuel = !fuel || car.fuel === fuel;
    const matchesTransmission =
      !transmission || car.transmission === transmission;
    const matchesPrice = !maxPrice || car.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesBrand &&
      matchesFuel &&
      matchesTransmission &&
      matchesPrice
    );
  });

  const resetFilters = () => {
    setSearch("");
    setBrand("");
    setFuel("");
    setTransmission("");
    setMaxPrice("");
  };

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none focus:border-amber-400";

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      <section className="px-6 pb-16 pt-32">
        <div className="mx-auto max-w-7xl">

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
              Explore Our Collection
            </p>

            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Find Your Perfect Car
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400">
              Discover our collection of premium vehicles, compare your
              options, and find the car that matches your lifestyle.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900 p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm text-slate-400">
                  Search Car
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by car name or brand..."
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">Brand</label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)} className={inputClass}>
                  <option value="">All Brands</option>
                  {[...new Set(cars.map((car) => car.brand))].map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">Fuel Type</label>
                <select value={fuel} onChange={(e) => setFuel(e.target.value)} className={inputClass}>
                  <option value="">All Fuel Types</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="CNG">CNG</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">Transmission</label>
                <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className={inputClass}>
                  <option value="">All Transmissions</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">Maximum Price</label>
                <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className={inputClass}>
                  <option value="">Any Price</option>
                  <option value="1000000">Under ₹10 Lakh</option>
                  <option value="1500000">Under ₹15 Lakh</option>
                  <option value="2000000">Under ₹20 Lakh</option>
                  <option value="3000000">Under ₹30 Lakh</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-400 px-4 py-3 font-semibold text-amber-400 transition hover:bg-amber-400 hover:text-slate-950"
                >
                  <RotateCcw size={17} />
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Available Cars */}
          <div className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Available Cars
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Explore our latest collection
                </p>
              </div>

              <span className="text-sm text-amber-400">
                {filteredCars.length} Cars Found
              </span>
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-slate-900 py-16 text-center">
                <h3 className="text-xl font-semibold text-white">
                  No Cars Found
                </h3>
                <p className="mt-2 text-slate-400">
                  Try changing your search or filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 rounded-lg bg-amber-400 px-6 py-3 font-semibold text-slate-950"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}

export default Cars;
