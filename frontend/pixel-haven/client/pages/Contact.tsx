import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Send, AlertCircle, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

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
            <span className="gradient-text">Get In Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions, feedback, or want to partner with us? We'd love to hear from you.
            Our team typically responds within 24 hours.
          </p>
        </section>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6 animate-fade-in-up">
            {/* Email */}
            <div className="glass rounded-2xl p-6 border border-white/10 space-y-3 hover:border-cyan-400/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Mail className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Email</h3>
              <p className="text-gray-400 text-sm">sentimentrecommendation@gmail.com</p>
              <a
                href="mailto:sentimentrecommendation@gmail.com"
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-sm"
              >
                Send Email →
              </a>
            </div>

            {/* Phone */}
            <div className="glass rounded-2xl p-6 border border-white/10 space-y-3 hover:border-cyan-400/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                <Phone className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Phone</h3>
              <p className="text-gray-400 text-sm">+91 6005001995</p>
              <p className="text-gray-400 text-sm">+91 7082233139</p>
              <a
                href="tel:+916005001995"
                className="text-purple-400 hover:text-purple-300 transition-colors font-medium text-sm"
              >
                Call Us →
              </a>
            </div>

            {/* Address */}
            <div className="glass rounded-2xl p-6 border border-white/10 space-y-3 hover:border-cyan-400/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Address</h3>
              <p className="text-gray-400 text-sm">
                132102 Panipat
                <br />
                Haryana, India
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-8 border border-white/10 space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white">Send us a Message</h2>

              {submitted && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 space-y-2">
                  <p className="text-green-400 font-medium">✓ Message Sent!</p>
                  <p className="text-green-300 text-sm">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg glass border transition-all duration-300 focus:outline-none ${
                      errors.name
                        ? "border-red-500/50"
                        : "border-white/10 focus:border-cyan-400/50"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg glass border transition-all duration-300 focus:outline-none ${
                      errors.email
                        ? "border-red-500/50"
                        : "border-white/10 focus:border-cyan-400/50"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-lg glass border transition-all duration-300 focus:outline-none ${
                      errors.subject
                        ? "border-red-500/50"
                        : "border-white/10 focus:border-cyan-400/50"
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2.5 rounded-lg glass border transition-all duration-300 focus:outline-none resize-none ${
                      errors.message
                        ? "border-red-500/50"
                        : "border-white/10 focus:border-cyan-400/50"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-lg bg-gradient-cyan-blue text-background font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 neon-glow"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Common Questions
          </h2>

          <div className="space-y-4">
            <FAQItem
              question="What is your response time?"
              answer="We typically respond to all inquiries within 24 business hours. For urgent matters, please call our phone number."
            />
            <FAQItem
              question="Do you offer technical support?"
              answer="Yes! Our technical support team is available to help with any integration issues, API questions, or feature requests."
            />
            <FAQItem
              question="Can I schedule a demo?"
              answer="Absolutely! Contact our sales team at sales@sentimentaware.com to schedule a personalized product demo."
            />
            <FAQItem
              question="Do you have a partnership program?"
              answer="Yes, we work with agencies and platforms. Reach out to partnerships@sentimentaware.com to discuss opportunities."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-3xl mx-auto text-center space-y-6 bg-gradient-subtle rounded-2xl p-12 border border-cyan-400/20 animate-fade-in">
          <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400">
            Try Sentiment Aware today and discover smarter recommendations.
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

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full text-left animate-fade-in-up"
    >
      <div className="glass rounded-lg p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{question}</h3>
          <span
            className={`text-cyan-400 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
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
