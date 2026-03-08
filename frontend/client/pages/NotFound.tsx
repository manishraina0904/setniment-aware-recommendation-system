import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-32 pb-20 px-4">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="text-8xl font-bold gradient-text">404</div>
          <h1 className="text-4xl font-bold text-white">Page Not Found</h1>
          <p className="text-xl text-gray-400 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. Continue prompting
            to add this page or return to home.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 rounded-lg bg-gradient-cyan-blue text-background font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 neon-glow"
          >
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
