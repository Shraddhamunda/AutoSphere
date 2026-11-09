import { Link } from "react-router-dom";
import { CarFront, Menu } from "lucide-react";

function Navbar() {
  return (
    <nav className="absolute top-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <CarFront size={30} className="text-amber-400" />

          <span className="text-2xl font-bold tracking-wide text-white">
            Auto<span className="text-amber-400">Sphere</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm text-white hover:text-amber-400">
            Home
          </Link>

          <Link to="/cars" className="text-sm text-white hover:text-amber-400">
            Explore Cars
          </Link>

          <Link to="/used-cars" className="text-sm text-white hover:text-amber-400">
            Used Cars
          </Link>

          <Link to="/test-drive" className="text-sm text-white hover:text-amber-400">
            Test Drive
          </Link>
        </div>

        {/* Login Button */}
        <div className="hidden md:block">
          <Link
            to="/login"
            className="rounded-lg bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button className="text-white md:hidden" aria-label="Open menu">
          <Menu size={26} />
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
