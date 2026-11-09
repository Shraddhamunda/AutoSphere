import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Gauge, Headset } from "lucide-react";
import hero from "../assets/hero.jpeg";

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-slate-950">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            `url(${hero})`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28">

        <div className="max-w-3xl">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Your Journey Starts Here
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
            Find Your
            <span className="block text-amber-400">
              Perfect Drive.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
            Discover exceptional cars, explore trusted dealerships,
            and experience a smarter way to buy your next vehicle
            with AutoSphere.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap gap-4">

            <Link
              to="/cars"
              className="flex items-center gap-3 rounded-lg bg-amber-400 px-7 py-4 font-semibold text-slate-950 transition hover:bg-amber-300"
            >
              Explore Cars
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/used-cars"
              className="rounded-lg border border-white/30 px-7 py-4 font-semibold text-white transition hover:border-amber-400 hover:text-amber-400"
            >
              Browse Used Cars
            </Link>

          </div>

          {/* Highlights */}
          <div className="mt-16 grid max-w-xl grid-cols-3 gap-5 border-t border-white/15 pt-8">

            <div>
              <ShieldCheck className="mb-3 text-amber-400" size={25} />
              <p className="text-sm font-semibold text-white">Trusted</p>
              <p className="mt-1 text-xs text-slate-400">Dealerships</p>
            </div>

            <div>
              <Gauge className="mb-3 text-amber-400" size={25} />
              <p className="text-sm font-semibold text-white">Premium</p>
              <p className="mt-1 text-xs text-slate-400">Experience</p>
            </div>

            <div>
              <Headset className="mb-3 text-amber-400" size={25} />
              <p className="text-sm font-semibold text-white">Expert</p>
              <p className="mt-1 text-xs text-slate-400">Assistance</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
