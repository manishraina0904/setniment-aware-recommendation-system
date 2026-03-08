import { ChevronDown, Zap, Brain, BarChart3, Shield, Lightbulb } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HowItWorks() {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium group text-lg hover:bg-cyan-500/10 px-4 py-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-bold">
            <span className="gradient-text">How Sentiment Aware</span>
            <br />
            <span className="text-white">Powers Smart Recommendations</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover how our advanced AI and NLP technologies analyze sentiment to deliver
            personalized product recommendations that truly match your preferences.
          </p>
        </section>

        {/* Main Process Flow */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Our 4-Step Process
          </h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in-up">
              <div className="order-2 md:order-1">
                <div className="glass rounded-2xl p-8 border border-white/10 space-y-4">
                  <div className="inline-block px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                    <span className="text-cyan-400 font-bold text-sm">Step 1</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">Input Analysis</h3>
                  <p className="text-gray-400 leading-relaxed">
                    You paste your product review, feedback, or text into our secure input box.
                    Our system accepts any length of text and preserves your privacy. Your input
                    is processed in real-time without being stored permanently.
                  </p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span>Accepts reviews of any length</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span>Privacy-first processing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span>Real-time instant processing</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="w-64 h-64 rounded-2xl glass border border-cyan-400/30 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-6xl">📝</div>
                    <p className="text-gray-400 text-sm">Your Review Input</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-cyan-400 animate-bounce">
                <ChevronDown className="w-8 h-8" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in-up">
              <div className="flex justify-center">
                <div className="w-64 h-64 rounded-2xl glass border border-purple-400/30 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-6xl">🧠</div>
                    <p className="text-gray-400 text-sm">AI Processing</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="glass rounded-2xl p-8 border border-white/10 space-y-4">
                  <div className="inline-block px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <span className="text-purple-400 font-bold text-sm">Step 2</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    Sentiment & Emotion Extraction
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Our advanced BERT transformer model and NLP algorithms analyze your text to
                    extract sentiment polarity, emotional context, and deeper semantic meaning.
                    We identify not just if text is positive or negative, but WHY.
                  </p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>BERT transformer-based analysis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>Multi-dimensional sentiment detection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>Emotion and context understanding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>Confidence scoring on results</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-cyan-400 animate-bounce">
                <ChevronDown className="w-8 h-8" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in-up">
              <div className="order-2 md:order-1">
                <div className="glass rounded-2xl p-8 border border-white/10 space-y-4">
                  <div className="inline-block px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <span className="text-blue-400 font-bold text-sm">Step 3</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    Intelligent Recommendation Engine
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Our algorithm compares your sentiment profile with our extensive product
                    database. We rank products based on sentiment match scores, ensuring
                    recommendations align with your preferences and values.
                  </p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>Smart sentiment matching</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>Product quality ranking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>User preference filtering</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>Personalized result ordering</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="w-64 h-64 rounded-2xl glass border border-blue-400/30 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-6xl">⚡</div>
                    <p className="text-gray-400 text-sm">Smart Ranking</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-cyan-400 animate-bounce">
                <ChevronDown className="w-8 h-8" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in-up">
              <div className="flex justify-center">
                <div className="w-64 h-64 rounded-2xl glass border border-green-400/30 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-6xl">🎯</div>
                    <p className="text-gray-400 text-sm">Your Results</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="glass rounded-2xl p-8 border border-white/10 space-y-4">
                  <div className="inline-block px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
                    <span className="text-green-400 font-bold text-sm">Step 4</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white">Instant Results</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Within seconds, you receive personalized product recommendations along with
                    detailed sentiment analysis. Each result includes confidence scores, ratings,
                    and sentiment match percentages to help you make informed decisions.
                  </p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Instant results display</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Detailed sentiment breakdown</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Confidence metrics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>Save & compare options</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Key Technologies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="BERT Model"
              description="State-of-the-art transformer architecture for deep understanding of text context and meaning"
              color="from-cyan-400 to-blue-400"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Real-Time Processing"
              description="Instant sentiment analysis with sub-second response times even for complex texts"
              color="from-blue-400 to-purple-400"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Privacy Focused"
              description="Your data is never stored permanently. All processing is encrypted and secure"
              color="from-purple-400 to-pink-400"
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Accuracy Metrics"
              description="95%+ accuracy on sentiment classification with detailed confidence scores"
              color="from-cyan-400 to-blue-400"
            />
            <FeatureCard
              icon={<Lightbulb className="w-8 h-8" />}
              title="Smart Insights"
              description="Beyond sentiment - emotional context, sarcasm detection, and nuance understanding"
              color="from-blue-400 to-purple-400"
            />
            <FeatureCard
              icon={<ChevronDown className="w-8 h-8" />}
              title="Continuous Learning"
              description="Our models improve over time with billions of data points and user feedback"
              color="from-purple-400 to-pink-400"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={expandedFAQ === index}
                onToggle={() =>
                  setExpandedFAQ(expandedFAQ === index ? null : index)
                }
              />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-3xl mx-auto text-center space-y-6 bg-gradient-subtle rounded-2xl p-12 border border-cyan-400/20 animate-fade-in">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400">
            Start analyzing sentiment and discovering smarter recommendations today.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 rounded-lg bg-gradient-cyan-blue text-background font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 neon-glow"
          >
            Try Now
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  return (
    <div className="group animate-fade-in-up glass rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 hover:neon-glow transition-all duration-300 space-y-4">
      <div className={`w-12 h-12 rounded-lg bg-gradient-${color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full text-left animate-fade-in-up"
    >
      <div className="glass rounded-lg p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{question}</h3>
          <ChevronDown
            className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        {isOpen && (
          <p className="text-gray-400 leading-relaxed animate-fade-in-down">
            {answer}
          </p>
        )}
      </div>
    </button>
  );
}

const faqs = [
  {
    question: "How accurate is the sentiment analysis?",
    answer:
      "Our BERT-based model achieves 95%+ accuracy on sentiment classification tasks. Accuracy varies based on text complexity, sarcasm, and mixed sentiments. We provide confidence scores with every result to indicate reliability.",
  },
  {
    question: "Is my data stored or used for training?",
    answer:
      "No. Your input text is processed in real-time and never stored on our servers. We do not use your data to train our models without explicit permission. Your privacy is our top priority.",
  },
  {
    question: "What types of text can I analyze?",
    answer:
      "You can analyze any English text including product reviews, customer feedback, social media posts, survey responses, and general opinions. We support texts of any length from short phrases to long paragraphs.",
  },
  {
    question: "How fast is the analysis?",
    answer:
      "Most analyses complete in under 500ms. Processing time depends on text length and complexity, but even lengthy reviews typically finish in 1-2 seconds. You'll see real-time results as soon as processing completes.",
  },
  {
    question: "Can I use this for languages other than English?",
    answer:
      "Currently, Sentiment Aware is optimized for English language texts. We are working on multi-language support and plan to add major languages including Spanish, French, German, and Mandarin in future releases.",
  },
  {
    question: "What makes recommendations different from competitors?",
    answer:
      "We combine deep sentiment analysis with product quality metrics and user preferences. Unlike simple keyword matching, our AI understands emotional context, values, and nuanced preferences to deliver truly personalized recommendations.",
  },
];
