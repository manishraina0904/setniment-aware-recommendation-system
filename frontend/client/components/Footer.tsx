import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Gradient Divider */}
        <div className="absolute left-0 right-0 h-px bg-gradient-cyan-purple opacity-40" />

        <div className="space-y-8 pt-4">
          {/* Main Footer Content - Horizontal Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-bold gradient-text mb-3">
                Sentiment Aware
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI-powered sentiment analysis for smarter recommendations.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="/"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Analyze
                  </a>
                </li>
                <li>
                  <a
                    href="/how-it-works"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    About
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="#privacy"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                Follow
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass hover:neon-glow transition-all group"
                  title="Twitter"
                >
                  <Twitter className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass hover:neon-glow transition-all group"
                  title="GitHub"
                >
                  <Github className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass hover:neon-glow transition-all group"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-gray-500 text-xs">
              © {currentYear} Sentiment Aware. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
