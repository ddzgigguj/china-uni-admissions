import EligibilityCalculator from "@/components/calculator/EligibilityCalculator";

export default function HomePage() {
return (
  <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
    {/* Nav */}
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <span className="font-bold text-[#1a3a6b] text-lg">ChinaUni</span>
          <span className="text-gray-400 text-sm hidden sm:block">· Admissions Platform</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="text-sm text-gray-600 hover:text-[#1a3a6b] font-medium transition-colors"
          >
            Sign In
          </a>
          <a
            href="/register"
            className="text-sm bg-[#c0392b] hover:bg-[#a93226] text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-sm"
          >
            Apply Now
          </a>
        </div>
      </div>
    </nav>

    {/* Hero */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
      <div className="inline-flex items-center gap-2 bg-blue-100 text-[#1a3a6b] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
        🇨🇳 Trusted by 10,000+ international students
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
        Find Your Perfect{" "}
        <span className="text-[#1a3a6b]">Chinese University</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
        Answer 4 quick questions and instantly see which universities in China match your profile — GPA, language level, budget, and more.
      </p>
      <p className="text-sm text-gray-400 mb-12">
        No account needed · Results in under 60 seconds · 20 top universities
      </p>

      {/* Calculator */}
      <EligibilityCalculator />
    </section>

    {/* Features */}
    <section className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
          Everything you need to study in China
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🎯",
              title: "Smart Matching",
              desc: "Our algorithm scores 20 universities against your GPA, language level, age, and budget to find your best fits.",
            },
            {
              icon: "📋",
              title: "Document Manager",
              desc: "Upload your passport, diploma, transcripts, and medical exam in one place. Track approval status in real time.",
            },
            {
              icon: "🏆",
              title: "Scholarship Finder",
              desc: "We flag universities offering scholarships that could cover your tuition gap automatically.",
            },
          ].map((f) => (
            <div key={f.title} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-[#1a3a6b] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-blue-200 text-sm">
          © 2024 ChinaUni Admissions Platform · Helping international students since 2020
        </p>
      </div>
    </footer>
  </main>
);
}