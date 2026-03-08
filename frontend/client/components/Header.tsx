import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Brain, Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass border-b border-white/10 shadow-lg shadow-cyan-500/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg glass group-hover:neon-glow transition-all duration-300">
            <Brain className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-lg font-bold gradient-text">Sentiment Aware</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-cyan-blue group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Desktop Auth Button */}
        <div className="hidden md:flex">
          {isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="px-6 py-2 rounded-lg bg-gradient-cyan-blue text-background font-medium text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 neon-glow"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 rounded-lg bg-gradient-cyan-blue text-background font-medium text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 neon-glow"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-b border-white/10 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-cyan-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setIsLoggedIn(!isLoggedIn);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-4 py-2 rounded-lg bg-gradient-cyan-blue text-background font-medium text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="w-full px-4 py-2 rounded-lg bg-gradient-cyan-blue text-background font-medium text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
