import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, AlertCircle, Loader } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getRecommendations, AnalysisResult, ApiError, slugify } from "@/lib/api";

interface DisplayState {
  loading: boolean;
  data: AnalysisResult | null;
  error: string | null;
}

export default function Index() {
  const [input, setInput] = useState("");
  const [state, setState] = useState<DisplayState>({
    loading: false,
    data: null,
    error: null,
  });
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load saved analysis results from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("analysisResults");
    const savedInput = localStorage.getItem("analysisInput");

    if (savedData && savedInput) {
      try {
        const parsedData = JSON.parse(savedData);
        setInput(savedInput);
        setState({
          loading: false,
          data: parsedData,
          error: null,
        });
        // Auto-scroll to results
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } catch (err) {
        console.error("Failed to load saved analysis:", err);
      }
    }
  }, []);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      setState({ loading: false, data: null, error: "Please enter some text" });
      return;
    }

    setState({ loading: true, data: null, error: null });

    const result = await getRecommendations(input);

    if ("error" in result && !Array.isArray(result.results)) {
      setState({
        loading: false,
        data: null,
        error: (result as ApiError).message || "An error occurred",
      });
    } else {
      const analysisResult = result as AnalysisResult;
      setState({ loading: false, data: analysisResult, error: null });

      // Save to localStorage for persistence
      localStorage.setItem("analysisResults", JSON.stringify(analysisResult));
      localStorage.setItem("analysisInput", input);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Clear saved data when user starts a new analysis
  const handleClearResults = () => {
    setInput("");
    setState({ loading: false, data: null, error: null });
    localStorage.removeItem("analysisResults");
    localStorage.removeItem("analysisInput");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleAnalyze(e as any);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl bg-cyan-500" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl bg-purple-500" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl sm:text-7xl font-bold leading-tight">
            <span className="gradient-text">Unlock Deeper Insights.</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Get Smarter Recommendations.
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in-up">
            Our AI analyzes sentiment to provide recommendations you'll truly
            love.
          </p>

          <div className="pt-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="inline-block px-6 py-2 rounded-full glass border-cyan-400/30 border">
              <span className="text-cyan-400 text-sm font-medium">
                ✨ Powered by Advanced AI & NLP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-subtle backdrop-blur-sm border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleAnalyze} className="space-y-6 animate-fade-in-up">
            {/* Input Box */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-cyan-purple opacity-0 group-focus-within:opacity-30 rounded-2xl blur transition-opacity duration-300" />
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste your review or text here…"
                className="relative w-full p-6 rounded-2xl glass border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 resize-none transition-all duration-300"
                rows={6}
              />
              <p className="text-xs text-gray-500 mt-2 ml-2">
                Tip: Press Ctrl+Enter to analyze
              </p>
            </div>

            {/* Error Alert */}
            {state.error && (
              <div className="p-4 rounded-xl glass border border-red-500/30 bg-red-500/10 flex gap-3 animate-fade-in-up">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium">Error</p>
                  <p className="text-red-300 text-sm">{state.error}</p>
                </div>
              </div>
            )}

            {/* CTA Button */}
            <button
              type="submit"
              disabled={state.loading}
              className="w-full py-4 px-6 rounded-xl bg-gradient-cyan-blue text-background font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 neon-glow group"
            >
              {state.loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Analyze Now
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Results Section */}
      {(state.loading || state.data) && (
        <section
          ref={resultsRef}
          className="py-24 px-4 sm:px-6 lg:px-8 space-y-24"
        >
          {state.loading && (
            <div className="max-w-4xl mx-auto text-center py-20 animate-fade-in">
              <div className="inline-block p-8 rounded-2xl glass">
                <Loader className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
                <p className="text-gray-300 font-medium">
                  Analyzing your sentiment...
                </p>
              </div>
            </div>
          )}

          {state.data && (
            <>
              {/* Analysis Report Section */}
              <div className="max-w-5xl mx-auto animate-fade-in-up">
                <div className="mb-16">
                  <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
                    Sentiment Analysis Report
                  </h2>
                  <div className="flex justify-center mt-6">
                    <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                      <p className="text-sm text-cyan-300 font-medium">Analysis Complete • Ready to Review</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <CircularProgress
                    percentage={state.data.analysis.sentiment_confidence || 85}
                    label="Positive"
                    icon="😊"
                  />
                  <CircularProgress
                    percentage={state.data.analysis.emotion_confidence || 10}
                    label="Neutral"
                    icon="😐"
                  />
                  <CircularProgress
                    percentage={
                      100 -
                      (state.data.analysis.sentiment_confidence || 85) -
                      (state.data.analysis.emotion_confidence || 10)
                    }
                    label="Negative"
                    icon="😔"
                  />
                </div>

                {/* Analysis Summary Section */}
                <div className="glass rounded-2xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 space-y-6 animate-fade-in-up">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="text-cyan-400">📊</span> Analysis Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <SummaryMetric
                      label="Sentiment Confidence"
                      value={`${state.data.analysis.sentiment_confidence || 85}%`}
                      color="cyan"
                    />
                    <SummaryMetric
                      label="Positive Score"
                      value={`${(state.data.analysis.positive_score || 0.85).toFixed(2)}`}
                      color="green"
                    />
                    <SummaryMetric
                      label="Neutral Score"
                      value={`${(state.data.analysis.neutral_score || 0.10).toFixed(2)}`}
                      color="yellow"
                    />
                    <SummaryMetric
                      label="Negative Score"
                      value={`${(state.data.analysis.negative_score || 0.05).toFixed(2)}`}
                      color="red"
                    />
                  </div>
                </div>
              </div>

              {/* Recommendations Grid */}
              {state.data.results && state.data.results.length > 0 ? (
                <div className="max-w-6xl mx-auto animate-fade-in-up">
                  <h2 className="text-3xl font-bold text-center mb-16 gradient-text">
                    Recommended Products
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {state.data.results.map((product, idx) => (
                      <ProductCard
                        key={idx}
                        product={product}
                        index={idx}
                        analysis={state.data.analysis}
                        analysisText={input}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto text-center py-16 animate-fade-in">
                  <div className="inline-block p-8 rounded-2xl glass space-y-4">
                    <div className="text-5xl">🔍</div>
                    <h3 className="text-2xl font-bold text-cyan-400">
                      No Matches Found
                    </h3>
                    <p className="text-gray-400">
                      Try analyzing different text to find matching products.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HowItWorksCard
              icon="📝"
              title="Input Analysis"
              description="Our system reads and processes your input text with advanced NLP techniques."
              delay="0ms"
            />
            <HowItWorksCard
              icon="🧠"
              title="Sentiment Extraction"
              description="BERT and transformer models extract sentiment, emotion, and context from your review."
              delay="200ms"
            />
            <HowItWorksCard
              icon="⚡"
              title="Smart Recommendation"
              description="We rank and filter products based on sentiment match score and relevance."
              delay="400ms"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need for intelligent sentiment analysis and smarter recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureItemCard
              icon="⚡"
              title="Lightning Fast"
              description="Sub-second analysis processing"
            />
            <FeatureItemCard
              icon="🎯"
              title="Highly Accurate"
              description="95%+ accuracy in sentiment detection"
            />
            <FeatureItemCard
              icon="🔒"
              title="Privacy First"
              description="Data never stored permanently"
            />
            <FeatureItemCard
              icon="🌐"
              title="Easy Integration"
              description="Simple API for any application"
            />
            <FeatureItemCard
              icon="📊"
              title="Detailed Analytics"
              description="Comprehensive sentiment breakdown"
            />
            <FeatureItemCard
              icon="🤖"
              title="AI Powered"
              description="Advanced transformer models"
            />
            <FeatureItemCard
              icon="📱"
              title="Mobile Ready"
              description="Works on all devices seamlessly"
            />
            <FeatureItemCard
              icon="🚀"
              title="Always Improving"
              description="Continuously learning models"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-subtle border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatItem number="1M+" label="Analyses Run" icon="📊" delay="0ms" />
            <StatItem number="95%+" label="Accuracy Rate" icon="🎯" delay="100ms" />
            <StatItem number="50K+" label="Active Users" icon="👥" delay="200ms" />
            <StatItem number="24/7" label="Support Available" icon="💬" delay="300ms" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              What Users Say
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of users getting smarter recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Manish Raina"
              role="Product Manager"
              comment="Sentiment Aware has transformed how we understand customer feedback. The accuracy is incredible!"
              delay="0ms"
            />
            <TestimonialCard
              name="Vineet Kumar"
              role="Data Analyst"
              comment="Finally, an AI tool that actually understands context and nuance. Highly recommend to anyone working with text data."
              delay="100ms"
            />
            <TestimonialCard
              name="Mohit Raina"
              role="Marketing Manager"
              comment="The recommendations are spot-on. Our customers love the personalized suggestions powered by sentiment analysis."
              delay="200ms"
            />
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-5xl font-bold text-white">
            Ready to Unlock Smarter Insights?
          </h2>
          <p className="text-xl text-gray-300">
            Start analyzing sentiment and discovering better recommendations today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-xl bg-gradient-cyan-blue text-background font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 neon-glow">
              Get Started Free
            </button>
            <a
              href="/contact"
              className="px-8 py-4 rounded-xl border-2 border-cyan-400 text-cyan-300 font-bold text-lg hover:bg-cyan-400/10 transition-all duration-300"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

interface CircularProgressProps {
  percentage: number;
  label: string;
  icon: string;
}

function CircularProgress({
  percentage,
  label,
  icon,
}: CircularProgressProps) {
  const circumference = 2 * Math.PI * 90;
  const offset = circumference * (1 - percentage / 100);

  const getColorGradient = (label: string) => {
    switch (label) {
      case "Positive":
        return { start: "#00d4ff", mid: "#00ff88", end: "#00ff88" };
      case "Neutral":
        return { start: "#fbbf24", mid: "#fbbf24", end: "#f59e0b" };
      case "Negative":
        return { start: "#ff006e", mid: "#ff006e", end: "#ff3366" };
      default:
        return { start: "#00d4ff", mid: "#0099ff", end: "#9933ff" };
    }
  };

  const colors = getColorGradient(label);

  return (
    <div className="flex flex-col items-center p-8 rounded-2xl glass border border-white/10 hover:border-cyan-400/30 hover:neon-glow transition-all duration-500 group animate-fade-in-up hover:scale-105 cursor-pointer">
      <div className="relative w-56 h-56 flex items-center justify-center mb-6">
        {/* 3D Shadow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-radial from-white/5 to-transparent blur-2xl" />

        <svg
          className="absolute transform -rotate-90 drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-2xl"
          width="220"
          height="220"
          style={{
            filter: `drop-shadow(0 0 20px ${colors.start}40)`
          }}
        >
          {/* Outer glow circle */}
          <circle
            cx="110"
            cy="110"
            r="95"
            fill="none"
            stroke={colors.start}
            strokeWidth="1"
            opacity="0.3"
            className="animate-pulse"
          />

          {/* Background circle */}
          <circle
            cx="110"
            cy="110"
            r="95"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="6"
          />

          {/* Progress circle with gradient */}
          <circle
            cx="110"
            cy="110"
            r="95"
            fill="none"
            stroke={`url(#grad-${label})`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-2000 ease-out drop-shadow-lg"
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 15px ${colors.start})`
            }}
          />

          <defs>
            <linearGradient id={`grad-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.start} stopOpacity="1" />
              <stop offset="50%" stopColor={colors.mid} stopOpacity="1" />
              <stop offset="100%" stopColor={colors.end} stopOpacity="1" />
            </linearGradient>
            <radialGradient id={`radial-${label}`}>
              <stop offset="0%" stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Center content with 3D effect */}
        <div className="text-center z-10 space-y-2 group-hover:scale-110 transition-transform duration-300">
          <div className="text-5xl animate-bounce" style={{ animationDuration: "2s" }}>
            {icon}
          </div>
          <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {Math.round(percentage)}%
          </div>
          <p className="text-xs text-gray-400 font-medium">confidence</p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors text-center capitalize">
        {label}
      </h3>
      <div className="mt-4 h-1.5 w-16 bg-gradient-cyan-blue rounded-full group-hover:w-20 transition-all duration-300" />
    </div>
  );
}

interface SummaryMetricProps {
  label: string;
  value: string;
  color: "cyan" | "green" | "yellow" | "red";
}

function SummaryMetric({ label, value, color }: SummaryMetricProps) {
  const colorClasses = {
    cyan: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300",
    green: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300",
    yellow: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-300",
    red: "from-red-500/20 to-pink-500/20 border-red-500/30 text-red-300",
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-lg p-4 hover:shadow-lg hover:shadow-${color}-500/20 transition-all duration-300 group/metric cursor-pointer`}>
      <p className="text-xs text-gray-400 font-medium mb-2 group-hover/metric:text-white transition-colors">{label}</p>
      <p className={`text-2xl font-bold ${colorClasses[color].split(" ").pop()}`}>
        {value}
      </p>
    </div>
  );
}

interface ProductCardProps {
  product: {
    product_name: string;
    brand: string;
    rating: number;
    final_score: number;
    product_image?: string;
  };
  index: number;
  analysis?: {
    sentiment_confidence?: number;
    emotion_confidence?: number;
    positive_score?: number;
    negative_score?: number;
    neutral_score?: number;
  };
  analysisText?: string;
}

function ProductCard({ product, index, analysis, analysisText }: ProductCardProps) {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sentimentScore = Math.round(product.final_score * 100);
  const scoreLabel = sentimentScore >= 80 ? "Excellent Match" : sentimentScore >= 60 ? "Good Match" : "Fair Match";

  const handleViewFullDetails = () => {
    const slug = slugify(`${product.brand}-${product.product_name}`);
    navigate(`/product/${slug}`, {
      state: {
        product,
        analysis,
        analysisText,
      }
    });
  };

  return (
    <div
      className="group rounded-2xl glass overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:neon-glow animate-zoom-in flex flex-col hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative w-full aspect-video bg-gradient-subtle overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background to-background/80">
          {product.product_image ? (
            <img
              src={product.product_image}
              alt={product.product_name}
              className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
            />
          ) : (
            <div className="text-6xl animate-bounce" style={{ animationDuration: "2s" }}>🛍️</div>
          )}
        </div>

        {/* Top Right Badges */}
        <div className="absolute top-4 right-4 flex gap-2 flex-col">
          <div className="px-4 py-2 rounded-full bg-gradient-cyan-blue text-background text-xs font-bold shadow-lg shadow-cyan-500/40 flex items-center gap-2 hover:shadow-cyan-500/60 transition-all">
            <span className={`text-base transition-transform ${isHovered ? "scale-125 rotate-12" : ""}`}>✨</span>
            <span className="font-semibold">{sentimentScore}%</span>
          </div>
        </div>

        {/* Brand Badge with animation */}
        <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-cyan-300 text-xs font-bold border border-cyan-500/30 hover:border-cyan-500/60 transition-all shadow-lg">
          {product.brand || "Brand"}
        </div>

        {/* Match Quality Indicator */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg">
          {scoreLabel}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-5 flex-1 flex flex-col">
        {/* Product Info */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors">
            {product.product_name}
          </h3>
          <p className="text-xs text-gray-500 mt-3 font-medium">
            🎯 Sentiment Match Score
          </p>
        </div>

        {/* Rating Section with enhanced styling */}
        <div className="space-y-3 border-t border-white/10 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg transition-all ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 drop-shadow-lg"
                        : i < Math.ceil(product.rating)
                        ? "text-yellow-400/50"
                        : "text-gray-700"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm font-bold text-yellow-400">
                {product.rating.toFixed(1)}/5
              </span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold bg-gradient-cyan-blue bg-clip-text text-transparent">
                {sentimentScore}%
              </p>
              <p className="text-xs text-gray-400 font-medium">match</p>
            </div>
          </div>

          {/* Enhanced Sentiment Indicator Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 transition-all duration-700 ease-out rounded-full shadow-lg shadow-cyan-500/50"
                style={{ width: `${sentimentScore}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 font-medium">Analysis Confidence</p>
          </div>
        </div>

        {/* Details Section with smooth animation */}
        {showDetails && (
          <div className="space-y-3 pt-2 animate-fade-in-down text-xs border-t border-white/10">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg p-4 space-y-2 border border-cyan-500/20">
              <p className="text-gray-300 flex justify-between">
                <span className="text-cyan-400 font-bold">Final Score:</span>
                <span className="font-mono text-cyan-300">{product.final_score.toFixed(3)}</span>
              </p>
              <p className="text-gray-300 flex justify-between">
                <span className="text-cyan-400 font-bold">Product Brand:</span>
                <span className="text-gray-200">{product.brand}</span>
              </p>
              {product.product_image && (
                <p className="text-gray-300 flex justify-between">
                  <span className="text-cyan-400 font-bold">Image:</span>
                  <span className="text-green-400">✓ Available</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/40 hover:to-blue-500/40 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 font-bold text-xs flex items-center justify-center gap-2 group/btn hover:shadow-lg hover:shadow-cyan-500/30"
          >
            {showDetails ? "Hide" : "Details"}
            <span className={`transition-all group-hover/btn:translate-x-1 ${showDetails ? "rotate-180" : ""}`}>
              →
            </span>
          </button>
          <button
            onClick={handleViewFullDetails}
            className="flex-1 py-3 px-4 rounded-lg bg-gradient-cyan-blue text-background border border-cyan-400/50 hover:border-cyan-300 transition-all duration-300 font-bold text-xs flex items-center justify-center gap-2 group/btn-full hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Full Details
            <span className="transition-all group-hover/btn-full:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface HowItWorksCardProps {
  icon: string;
  title: string;
  description: string;
  delay: string;
}

function HowItWorksCard({
  icon,
  title,
  description,
  delay,
}: HowItWorksCardProps) {
  const stepNum = Math.floor(parseInt(delay) / 200) + 1;

  return (
    <div
      className="relative animate-fade-in-up rounded-2xl p-8 glass border border-white/10 hover:border-cyan-400/50 group hover:neon-glow transition-all duration-300 overflow-hidden"
      style={{ animationDelay: delay }}
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300 -z-10" />

      {/* Step number circle */}
      <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-cyan-blue text-background flex items-center justify-center font-bold text-sm shadow-lg shadow-cyan-500/30">
        {stepNum}
      </div>

      {/* Icon */}
      <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-300 inline-block">
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

interface FeatureItemCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureItemCard({ icon, title, description }: FeatureItemCardProps) {
  return (
    <div className="animate-fade-in-up rounded-xl p-6 glass border border-white/10 hover:border-cyan-400/30 hover:neon-glow transition-all duration-300 group text-center space-y-3">
      <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

interface StatItemProps {
  number: string;
  label: string;
  icon: string;
  delay: string;
}

function StatItem({ number, label, icon, delay }: StatItemProps) {
  return (
    <div
      className="animate-fade-in-up text-center space-y-3 p-6 rounded-xl glass border border-white/10 hover:border-cyan-400/30 transition-all"
      style={{ animationDelay: delay }}
    >
      <div className="text-5xl">{icon}</div>
      <div className="text-4xl font-bold gradient-text">{number}</div>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
}

interface TestimonialCardProps {
  name: string;
  role: string;
  comment: string;
  delay: string;
}

function TestimonialCard({
  name,
  role,
  comment,
  delay,
}: TestimonialCardProps) {
  return (
    <div
      className="animate-fade-in-up rounded-2xl p-8 glass border border-white/10 hover:border-cyan-400/30 hover:neon-glow transition-all duration-300 space-y-4"
      style={{ animationDelay: delay }}
    >
      {/* Rating Stars */}
      <div className="flex gap-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">
              ★
            </span>
          ))}
      </div>

      {/* Comment */}
      <p className="text-gray-300 leading-relaxed italic">"{comment}"</p>

      {/* User Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <div className="w-10 h-10 rounded-full bg-gradient-cyan-purple flex items-center justify-center text-white font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{name}</p>
          <p className="text-cyan-400 text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}
