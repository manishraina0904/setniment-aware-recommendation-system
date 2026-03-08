import { Award, Users, Zap, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  const navigate = useNavigate();
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
            <span className="gradient-text">About Sentiment Aware</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We're building the future of intelligent recommendations powered by advanced AI and
            sentiment analysis. Our mission is to help people discover products and services that
            truly match their values and preferences.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="max-w-3xl mx-auto animate-fade-in-up">
          <div className="glass rounded-2xl p-12 border border-white/10 space-y-6">
            <h2 className="text-3xl font-bold gradient-text">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              To empower people with AI-driven insights that transform how they discover and choose
              products. We believe that recommendations should be smart, personalized, and based on
              genuine understanding of individual preferences and values—not just popularity or
              algorithms that prioritize profit over user satisfaction.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              By combining cutting-edge NLP and sentiment analysis technology, we're creating a new
              standard for intelligent recommendations that truly understand what matters to you.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            By The Numbers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard number="1M+" label="Analyses Performed" delay="0ms" />
            <StatCard number="95%+" label="Accuracy Rate" delay="100ms" />
            <StatCard number="50K+" label="Active Users" delay="200ms" />
            <StatCard number="24/7" label="Uptime" delay="300ms" />
          </div>
        </section>

        {/* Core Values */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ValueCard
              icon="🤖"
              title="Intelligence"
              description="We leverage the latest AI and machine learning technologies to provide the most accurate and insightful analysis possible."
              delay="0ms"
            />
            <ValueCard
              icon="🛡️"
              title="Privacy"
              description="Your data is sacred. We never store personal information permanently and use enterprise-grade encryption for all processing."
              delay="100ms"
            />
            <ValueCard
              icon="⚡"
              title="Speed"
              description="Instant analysis and recommendations. We process complex sentiment analysis in milliseconds, not minutes."
              delay="200ms"
            />
            <ValueCard
              icon="❤️"
              title="User-First"
              description="Every decision we make prioritizes user value and transparency. No manipulative algorithms or hidden agendas."
              delay="300ms"
            />
            <ValueCard
              icon="🌱"
              title="Continuous Innovation"
              description="We're constantly improving our models, adding features, and expanding capabilities based on user feedback."
              delay="400ms"
            />
            <ValueCard
              icon="🌍"
              title="Accessibility"
              description="Making advanced AI accessible to everyone. Our platform is designed to be intuitive and easy to use for all skill levels."
              delay="500ms"
            />
          </div>
        </section>

        {/* Product Features */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureSection
              title="Sentiment Analysis Engine"
              features={[
                "Multi-dimensional sentiment detection (positive, negative, neutral)",
                "Emotion extraction (joy, anger, sadness, fear, surprise)",
                "Sarcasm and context awareness",
                "Confidence scoring on all results",
                "Real-time processing in <500ms",
                "Support for complex, nuanced text",
              ]}
              color="from-cyan-400 to-blue-400"
            />
            <FeatureSection
              title="Intelligent Recommendations"
              features={[
                "Personalized product matching",
                "Sentiment-based filtering and ranking",
                "Quality ratings and user reviews",
                "Detailed sentiment match percentages",
                "Brand and category recommendations",
                "Comparison tools for multiple products",
              ]}
              color="from-purple-400 to-pink-400"
            />
            <FeatureSection
              title="Advanced Analytics"
              features={[
                "Detailed sentiment breakdown (positive/negative/neutral %)",
                "Emotion confidence metrics",
                "Trend analysis across multiple analyses",
                "Historical data and insights",
                "Export analysis results",
                "Custom reporting features",
              ]}
              color="from-blue-400 to-cyan-400"
            />
            <FeatureSection
              title="User Experience"
              features={[
                "Intuitive, modern interface",
                "Mobile-responsive design",
                "Keyboard shortcuts and accessibility",
                "Dark mode with eye-friendly aesthetics",
                "One-click result sharing",
                "Save and bookmark features",
              ]}
              color="from-pink-400 to-purple-400"
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Meet The Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TeamMember
              name="Manish Raina"
              role="Founder & CEO"
              bio="Final year engineering student passionate about AI and sentiment analysis. Leads the project vision and oversees product development."
              delay="0ms"
            />
            <TeamMember
              name="Vineet Dhiman"
              role="CTO & AI Lead"
              bio="Final year engineering student specializing in machine learning and NLP. Develops core sentiment analysis engine and AI models."
              delay="100ms"
            />
          </div>
        </section>

        {/* Technology Stack */}
        <section className="max-w-4xl mx-auto animate-fade-in-up">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Technology Stack
          </h2>

          <div className="glass rounded-2xl p-8 border border-white/10 space-y-8">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-cyan-400">Core AI/ML</h3>
              <div className="flex flex-wrap gap-2">
                {["PyTorch", "Transformers", "BERT", "FastAPI", "TensorFlow"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-purple-400">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {["React 18", "TypeScript", "Tailwind CSS", "Vite", "React Router"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-blue-400">Backend & NLP Libraries</h3>
              <div className="flex flex-wrap gap-2">
                {["Python", "FastAPI", "NLTK", "Scikit-learn", "Pandas", "NumPy"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Our Journey
          </h2>

          <div className="space-y-8">
            <TimelineItem
              year="2024"
              title="Final Year Project"
              description="Sentiment Aware is developed as a final year engineering project for the batch at Panipat Institute"
              delay="0ms"
            />
            <TimelineItem
              year="2024"
              title="Project Inception"
              description="A team of 2 final year engineering students come together with a vision to revolutionize product recommendations using AI and sentiment analysis"
              delay="100ms"
            />
            <TimelineItem
              year="2024"
              title="Development Phase"
              description="Built advanced NLP models using BERT and transformers to achieve 95%+ accuracy in sentiment detection"
              delay="200ms"
            />
            <TimelineItem
              year="2024"
              title="No External Funding"
              description="Developed entirely by students without external funding, bootstrapped with personal resources and institutional support"
              delay="300ms"
            />
            <TimelineItem
              year="2024"
              title="Ready for Production"
              description="Completed a fully functional platform ready for deployment with sentiment analysis and intelligent recommendations"
              delay="400ms"
            />
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-3xl mx-auto text-center space-y-6 bg-gradient-subtle rounded-2xl p-12 border border-cyan-400/20 animate-fade-in">
          <h2 className="text-3xl font-bold text-white">Get In Touch</h2>
          <p className="text-xl text-gray-400">
            Have questions about Sentiment Aware? We'd love to hear from you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/contact"
              className="px-8 py-3 rounded-lg bg-gradient-cyan-blue text-background font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 neon-glow"
            >
              Contact Us
            </a>
            <a
              href="/"
              className="px-8 py-3 rounded-lg border border-white/20 text-white font-bold hover:border-cyan-400/50 transition-all duration-300"
            >
              Try Now
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

interface StatCardProps {
  number: string;
  label: string;
  delay: string;
}

function StatCard({ number, label, delay }: StatCardProps) {
  return (
    <div
      className="glass rounded-2xl p-8 border border-white/10 text-center space-y-2 hover:neon-glow transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="text-4xl font-bold gradient-text">{number}</div>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
  delay: string;
}

function ValueCard({ icon, title, description, delay }: ValueCardProps) {
  return (
    <div
      className="glass rounded-2xl p-8 border border-white/10 space-y-4 hover:border-cyan-400/30 hover:neon-glow transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

interface FeatureSectionProps {
  title: string;
  features: string[];
  color: string;
}

function FeatureSection({ title, features, color }: FeatureSectionProps) {
  return (
    <div className="glass rounded-2xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 space-y-6 animate-fade-in-up">
      <h3 className="text-2xl font-bold gradient-text">{title}</h3>
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-gray-300">
            <span className="text-cyan-400 font-bold mt-0.5">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  delay: string;
}

function TeamMember({ name, role, bio, delay }: TeamMemberProps) {
  return (
    <div
      className="glass rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 hover:neon-glow transition-all duration-300 space-y-4 text-center animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="w-16 h-16 rounded-full bg-gradient-cyan-purple mx-auto flex items-center justify-center text-2xl">
        👤
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white">{name}</h3>
        <p className="text-cyan-400 font-medium text-sm">{role}</p>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{bio}</p>
    </div>
  );
}

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  delay: string;
}

function TimelineItem({ year, title, description, delay }: TimelineItemProps) {
  return (
    <div
      className="flex gap-6 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-cyan-purple flex items-center justify-center border-2 border-background">
          <span className="text-white font-bold text-sm">{year.slice(-2)}</span>
        </div>
        <div className="w-1 h-16 bg-gradient-to-b from-cyan-400 to-purple-400 mt-2" />
      </div>
      <div className="glass rounded-2xl p-6 border border-white/10 flex-1 space-y-2">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}
