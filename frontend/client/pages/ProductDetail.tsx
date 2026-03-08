import { useState } from "react";
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Zap, Shield, TrendingUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ProductData {
  product_name: string;
  brand: string;
  rating: number;
  final_score: number;
  product_image?: string;
}

export default function ProductDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product as ProductData;
  const analysisText = location.state?.analysisText as string;
  const analysis = location.state?.analysis;

  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "sentiment" | "reviews">("overview");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center space-y-4">
            <p className="text-2xl text-gray-400">Product not found</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 rounded-lg bg-gradient-cyan-blue text-background font-bold hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sentimentScore = Math.round(product.final_score * 100);
  const positiveScore = Math.round((analysis?.positive_score || 0.85) * 100);
  const negativeScore = Math.round((analysis?.negative_score || 0.05) * 100);
  const neutralScore = Math.round((analysis?.neutral_score || 0.10) * 100);

  const dummyAmazonLink = `https://www.amazon.com/s?k=${encodeURIComponent(product.product_name)}`;
  const dummyFlipkartLink = `https://www.flipkart.com/search?q=${encodeURIComponent(product.product_name)}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium group text-lg hover:bg-cyan-500/10 px-4 py-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Results
          </button>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Product Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Image */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl glass border border-white/10 p-6 overflow-hidden space-y-4 sticky top-24">
                <div className="aspect-square bg-gradient-subtle rounded-xl flex items-center justify-center overflow-hidden">
                  {product.product_image ? (
                    <img
                      src={product.product_image}
                      alt={product.product_name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-8xl animate-bounce">🛍️</div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`w-full py-3 px-4 rounded-lg border-2 transition-all duration-300 flex items-center justify-center gap-2 font-bold ${
                      isFavorite
                        ? "bg-red-500/20 border-red-500/60 text-red-300"
                        : "border-white/20 text-white hover:border-red-500/60 hover:bg-red-500/10"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                    {isFavorite ? "Saved" : "Save"}
                  </button>
                  <button className="w-full py-3 px-4 rounded-lg border border-white/20 text-white hover:border-cyan-400/60 hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center gap-2 font-bold">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                    {product.brand}
                  </p>
                  <h1 className="text-4xl font-bold text-white">{product.product_name}</h1>
                </div>

                {/* Rating and Score */}
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : i < Math.ceil(product.rating)
                              ? "fill-yellow-400/50 text-yellow-400"
                              : "text-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-bold text-white">{product.rating.toFixed(1)}/5</span>
                  </div>

                  <div className="px-4 py-2 rounded-lg bg-gradient-cyan-blue/20 border border-cyan-500/30 space-y-0.5">
                    <p className="text-xs text-cyan-300 font-medium">Sentiment Match</p>
                    <p className="text-2xl font-bold text-cyan-400">{sentimentScore}%</p>
                  </div>
                </div>
              </div>

              {/* Sentiment Analysis Summary */}
              <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
                <h2 className="text-lg font-bold text-white">Sentiment Analysis for This Product</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 font-medium">Positive</p>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-400"
                        style={{ width: `${positiveScore}%` }}
                      />
                    </div>
                    <p className="text-sm font-bold text-green-400">{positiveScore}%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 font-medium">Neutral</p>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-amber-400"
                        style={{ width: `${neutralScore}%` }}
                      />
                    </div>
                    <p className="text-sm font-bold text-yellow-400">{neutralScore}%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 font-medium">Negative</p>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-400 to-pink-400"
                        style={{ width: `${negativeScore}%` }}
                      />
                    </div>
                    <p className="text-sm font-bold text-red-400">{negativeScore}%</p>
                  </div>
                </div>
              </div>

              {/* Purchase Buttons */}
              <div className="space-y-3">
                <p className="text-sm text-gray-400 font-medium">Buy This Product</p>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={dummyAmazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Amazon
                  </a>
                  <a
                    href={dummyFlipkartLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Flipkart
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex gap-4 border-b border-white/10">
              {(["overview", "sentiment", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-bold transition-all duration-300 border-b-2 ${
                    activeTab === tab
                      ? "border-cyan-400 text-cyan-400"
                      : "border-transparent text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {tab === "overview" && "Overview"}
                  {tab === "sentiment" && "Sentiment Report"}
                  {tab === "reviews" && "Customer Reviews"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fade-in">
                {/* Product Specifications */}
                <div className="glass rounded-2xl p-8 border border-white/10 space-y-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FeatureItem title="High Performance" description="Optimized for speed and efficiency" />
                    <FeatureItem title="User-Friendly" description="Intuitive design and easy navigation" />
                    <FeatureItem title="Quality Assurance" description="Tested and verified by experts" />
                    <FeatureItem title="Customer Support" description="24/7 dedicated support team" />
                    <FeatureItem title="Warranty" description="12-month manufacturer warranty included" />
                    <FeatureItem title="Eco-Friendly" description="Sustainable and environmentally conscious" />
                  </div>
                </div>

                {/* Product Description */}
                <div className="glass rounded-2xl p-8 border border-white/10 space-y-4">
                  <h3 className="text-2xl font-bold text-white">About This Product</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {product.product_name} from {product.brand} is a premium product that combines cutting-edge
                    technology with exceptional quality. Based on sentiment analysis of reviews, this product has
                    received {sentimentScore}% positive recommendations, making it an excellent choice for customers
                    seeking reliable and high-performing solutions.
                  </p>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    With a rating of {product.rating.toFixed(1)}/5 stars, this product stands out for its
                    durability, functionality, and customer satisfaction. Whether you're a first-time buyer or a
                    returning customer, this product delivers on its promises.
                  </p>
                </div>

                {/* Specifications */}
                <div className="glass rounded-2xl p-8 border border-white/10 space-y-4">
                  <h3 className="text-2xl font-bold text-white">Specifications</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-400">Brand</span>
                      <span className="font-bold text-white">{product.brand}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-400">Model</span>
                      <span className="font-bold text-white">{product.product_name.substring(0, 20)}...</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-400">Customer Rating</span>
                      <span className="font-bold text-yellow-400">{product.rating.toFixed(1)}/5</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-gray-400">Sentiment Score</span>
                      <span className="font-bold text-cyan-400">{sentimentScore}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-400">Availability</span>
                      <span className="font-bold text-green-400">In Stock</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "sentiment" && (
              <div className="space-y-6 animate-fade-in">
                <div className="glass rounded-2xl p-8 border border-white/10 space-y-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                    Detailed Sentiment Analysis
                  </h3>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-medium">Overall Sentiment Confidence</span>
                        <span className="text-lg font-bold text-cyan-400">
                          {analysis?.sentiment_confidence || 85}%
                        </span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-cyan-blue transition-all duration-1000"
                          style={{ width: `${analysis?.sentiment_confidence || 85}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <SentimentCard
                        label="Positive Feedback"
                        value={positiveScore}
                        color="from-green-500 to-emerald-500"
                        icon="😊"
                      />
                      <SentimentCard
                        label="Neutral Reviews"
                        value={neutralScore}
                        color="from-yellow-500 to-amber-500"
                        icon="😐"
                      />
                      <SentimentCard
                        label="Negative Concerns"
                        value={negativeScore}
                        color="from-red-500 to-pink-500"
                        icon="😔"
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/20 space-y-3">
                    <h4 className="text-lg font-bold text-cyan-300">Why This Product Was Recommended</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Based on your search query: <span className="text-cyan-400 font-semibold">"{analysisText}"</span>
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      This product matched your sentiment with {sentimentScore}% accuracy. Our AI analyzed customer
                      feedback and determined that {sentimentScore}% of users expressed satisfaction with this
                      product's quality, performance, and overall value. The positive sentiment aligns well with your
                      expressed needs and preferences.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6 animate-fade-in">
                <div className="glass rounded-2xl p-8 border border-white/10 space-y-6">
                  <h3 className="text-2xl font-bold text-white">Customer Reviews Summary</h3>

                  <div className="space-y-4">
                    <ReviewItem
                      name="John Smith"
                      rating={5}
                      title="Excellent Product!"
                      text="Exceeded my expectations. Great quality and amazing customer service. Highly recommend!"
                      sentiment="positive"
                    />
                    <ReviewItem
                      name="Sarah Johnson"
                      rating={4}
                      title="Very Good Value"
                      text="Good product at a reasonable price. Minor issues but overall satisfied with my purchase."
                      sentiment="positive"
                    />
                    <ReviewItem
                      name="Mike Davis"
                      rating={5}
                      title="Best In Its Class"
                      text="Incredible performance and durability. Worth every penny. Will definitely buy again!"
                      sentiment="positive"
                    />
                    <ReviewItem
                      name="Emma Wilson"
                      rating={3}
                      title="Average Experience"
                      text="Does what it says but nothing special. Decent product for the price."
                      sentiment="neutral"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

interface FeatureItemProps {
  title: string;
  description: string;
}

function FeatureItem({ title, description }: FeatureItemProps) {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      <div className="text-2xl flex-shrink-0">✓</div>
      <div>
        <h4 className="font-bold text-white">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}

interface SentimentCardProps {
  label: string;
  value: number;
  color: string;
  icon: string;
}

function SentimentCard({ label, value, color, icon }: SentimentCardProps) {
  return (
    <div className={`bg-gradient-to-br ${color} bg-opacity-10 rounded-lg p-6 border border-white/10 space-y-2 text-center hover:scale-105 transition-transform`}>
      <p className="text-3xl">{icon}</p>
      <p className="text-gray-300 text-sm font-medium">{label}</p>
      <p className="text-3xl font-bold text-white">{value}%</p>
    </div>
  );
}

interface ReviewItemProps {
  name: string;
  rating: number;
  title: string;
  text: string;
  sentiment: "positive" | "neutral" | "negative";
}

function ReviewItem({ name, rating, title, text, sentiment }: ReviewItemProps) {
  const sentimentColor = {
    positive: "border-l-green-400",
    neutral: "border-l-yellow-400",
    negative: "border-l-red-400",
  };

  return (
    <div className={`border-l-4 ${sentimentColor[sentiment]} bg-white/5 rounded-r-lg p-4 space-y-2 hover:bg-white/10 transition-colors`}>
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-white">{name}</h4>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
      <h5 className="text-cyan-400 font-semibold text-sm">{title}</h5>
      <p className="text-gray-300 text-sm">{text}</p>
    </div>
  );
}
