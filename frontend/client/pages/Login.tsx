import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type AuthTab = "login" | "signup";

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
  rememberMe?: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (activeTab === "signup") {
      if (!formData.fullName) {
        newErrors.fullName = "Full name is required";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulated auth - in production, call API
      alert(
        `${activeTab === "login" ? "Login" : "Sign Up"} successful! (Demo mode)`
      );
    }, 1500);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      alert("Please enter your email");
      return;
    }
    if (!validateEmail(resetEmail)) {
      alert("Please enter a valid email");
      return;
    }
    setResetSent(true);
    setTimeout(() => {
      setResetEmail("");
      setResetSent(false);
      setShowForgotPassword(false);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="max-w-md mx-auto mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium group text-lg hover:bg-cyan-500/10 px-4 py-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>
        <div className="max-w-md mx-auto">
          {/* Main Auth Card */}
          {!showForgotPassword ? (
            <div className="animate-fade-in-up space-y-6">
              {/* Tab Buttons */}
              <div className="flex gap-2 p-1 rounded-lg glass border border-white/10 bg-white/5">
                <button
                  onClick={() => {
                    setActiveTab("login");
                    setErrors({});
                  }}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 font-medium text-sm ${
                    activeTab === "login"
                      ? "bg-gradient-cyan-blue text-background"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setActiveTab("signup");
                    setErrors({});
                  }}
                  className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 font-medium text-sm ${
                    activeTab === "signup"
                      ? "bg-gradient-cyan-blue text-background"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form Container */}
              <div className="glass rounded-2xl p-8 border border-white/10 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold text-white">
                    {activeTab === "login" ? "Welcome Back" : "Create Account"}
                  </h1>
                  <p className="text-gray-400 text-sm">
                    {activeTab === "login"
                      ? "Sign in to access your sentiment analysis"
                      : "Join Sentiment Aware today"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name Field (Sign Up Only) */}
                  {activeTab === "signup" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          name="fullName"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg glass border transition-all duration-300 focus:outline-none ${
                            errors.fullName
                              ? "border-red-500/50"
                              : "border-white/10 focus:border-cyan-400/50"
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.fullName}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg glass border transition-all duration-300 focus:outline-none ${
                          errors.email
                            ? "border-red-500/50"
                            : "border-white/10 focus:border-cyan-400/50"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-12 py-2.5 rounded-lg glass border transition-all duration-300 focus:outline-none ${
                          errors.password
                            ? "border-red-500/50"
                            : "border-white/10 focus:border-cyan-400/50"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password (Sign Up Only) */}
                  {activeTab === "signup" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-12 py-2.5 rounded-lg glass border transition-all duration-300 focus:outline-none ${
                            errors.confirmPassword
                              ? "border-red-500/50"
                              : "border-white/10 focus:border-cyan-400/50"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />{" "}
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Remember Me / Forgot Password (Login Only) */}
                  {activeTab === "login" && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleInputChange}
                          className="w-4 h-4 rounded cursor-pointer accent-cyan-400"
                        />
                        <span className="text-gray-400">Remember me</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-lg bg-gradient-cyan-blue text-background font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 neon-glow mt-6"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {activeTab === "login" ? "Sign In" : "Create Account"}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Auth Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2 px-4 rounded-lg glass border border-white/10 hover:border-cyan-400/30 transition-all duration-300 text-sm font-medium text-gray-300 hover:text-white">
                    Google
                  </button>
                  <button className="py-2 px-4 rounded-lg glass border border-white/10 hover:border-cyan-400/30 transition-all duration-300 text-sm font-medium text-gray-300 hover:text-white">
                    GitHub
                  </button>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-400">
                  {activeTab === "login" ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab(activeTab === "login" ? "signup" : "login");
                      setErrors({});
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    {activeTab === "login" ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>

              {/* Back to Home */}
              <div className="text-center">
                <Link
                  to="/"
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            /* Forgot Password Form */
            <div className="animate-fade-in-up space-y-6">
              <div className="glass rounded-2xl p-8 border border-white/10 space-y-6">
                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold text-white">
                    Reset Your Password
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Enter your email and we'll send you a reset link
                  </p>
                </div>

                {resetSent ? (
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 space-y-3">
                    <p className="text-green-400 font-medium">
                      ✓ Reset link sent!
                    </p>
                    <p className="text-green-300 text-sm">
                      Check your email for instructions to reset your password.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg glass border border-white/10 focus:border-cyan-400/50 transition-all duration-300 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-lg bg-gradient-cyan-blue text-background font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 neon-glow"
                    >
                      Send Reset Link
                    </button>
                  </form>
                )}

                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full py-2 px-4 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-cyan-400/30 transition-all duration-300 text-sm font-medium"
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
