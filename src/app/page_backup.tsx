import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen">
      <style jsx global>{`
        body {
          font-family: var(--font-roboto), 'Roboto', sans-serif;
          background-color: #0f171e;
          color: #e2e8f0;
          margin: 0;
          padding: 0;
          line-height: 1.6;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-montserrat), 'Montserrat', sans-serif;
          font-weight: 800;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto overflow-x-hidden">
        {/* Header */}
        <header className="flex justify-between items-center px-12 py-8 relative z-10">
          <div className="text-2xl font-bold text-white">CADENCE LABS</div>
          <nav>
            <ul className="flex gap-6 list-none p-0 m-0">
              <li>
                <Link href="/how-it-works" className="text-slate-300 hover:text-green-400 transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-slate-300 hover:text-green-400 transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-green-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/signin" 
                  className="bg-transparent border border-white text-white px-4 py-2 rounded-full transition-all hover:bg-green-400 hover:border-green-400 hover:text-slate-900"
                >
                  Log In
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center px-12 text-white">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900"
            style={{
              background: 'linear-gradient(135deg, #0f171e 0%, #1e293b 50%, #0ea5e9 100%)'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent opacity-80"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-8">
              1111Turn Raw Rider Data into <br />
              WORLD TOUR-WINNING <br />
              <span className="text-green-400">DEFINING DECISIONS</span>
            </h1>
            <div className="flex gap-4 flex-col sm:flex-row">
              <Link 
                href="/demo" 
                className="bg-green-400 text-slate-900 px-6 py-3 rounded-full font-bold transition-transform hover:-translate-y-1 text-center"
              >
                Book a Team Demo
              </Link>
              <Link 
                href="/technical-brief" 
                className="bg-transparent border border-green-400 text-green-400 px-6 py-3 rounded-full font-bold transition-transform hover:-translate-y-1 text-center"
              >
                Download the Technical Brief
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="px-4 md:px-12 py-16 flex flex-col gap-20">
          {/* Features Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-slate-400">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 flex flex-col gap-4 text-center transition-all hover:border-green-400 hover:-translate-y-2">
              <div className="h-16 w-16 mx-auto bg-gradient-to-br from-green-400 to-cyan-400 rounded-xl flex items-center justify-center text-2xl">
                🏃
              </div>
              <h3 className="text-white text-xl font-bold m-0">Rider Digital Twin</h3>
              <p className="text-slate-400 text-sm">
                Create rider data is fair and record in thrive direct for thonrl they history the toy Gounevideos.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 flex flex-col gap-4 text-center transition-all hover:border-green-400 hover:-translate-y-2">
              <div className="h-16 w-16 mx-auto bg-gradient-to-br from-green-400 to-cyan-400 rounded-xl flex items-center justify-center text-2xl">
                ⚡
              </div>
              <h3 className="text-white text-xl font-bold m-0">Race & Tactics Simulator</h3>
              <p className="text-slate-400 text-sm">
                This fesurs netrus orestuue os naues incepeps to si ex his ip et duis Cius. Nullus ut tellus et.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 flex flex-col gap-4 text-center transition-all hover:border-green-400 hover:-translate-y-2">
              <div className="h-16 w-16 mx-auto bg-gradient-to-br from-green-400 to-cyan-400 rounded-xl flex items-center justify-center text-2xl">
                🔧
              </div>
              <h3 className="text-white text-xl font-bold m-0">Aero & Equipment Intelligence</h3>
              <p className="text-slate-400 text-sm">
                Even sit amaetur dum nulen his an cum volutpat ksushe in hac que quis et ip for lorem soureis.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 flex flex-col gap-4 text-center transition-all hover:border-green-400 hover:-translate-y-2">
              <div className="h-16 w-16 mx-auto bg-gradient-to-br from-green-400 to-cyan-400 rounded-xl flex items-center justify-center text-2xl">
                ❤️
              </div>
              <h3 className="text-white text-xl font-bold m-0">Recovery & Risk Monitor</h3>
              <p className="text-slate-400 text-sm">
                View tmas don staay wites dwe loqo to reatse an erard heart ot top litlets the.
              </p>
            </div>
          </section>

          {/* Trust Section */}
          <section className="flex flex-col items-center text-center gap-4">
            <p className="text-xl text-slate-400">Trusted by World Tour performance staff</p>
            <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap">
              <div className="h-12 w-20 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-green-400 font-bold text-xs">
                JUMBO
              </div>
              <div className="h-12 w-20 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-green-400 font-bold text-xs">
                UAE
              </div>
              <div className="h-12 w-20 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-green-400 font-bold text-xs">
                SOUDAL
              </div>
              <div className="h-12 w-20 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-green-400 font-bold text-xs">
                INEOS
              </div>
              <div className="h-12 w-20 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-green-400 font-bold text-xs">
                TREK
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20 py-8 text-slate-400">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-green-400 to-cyan-400 rounded-xl flex items-center justify-center text-2xl text-white mb-2">
                🔗
              </div>
              <p className="text-green-400 font-semibold">Connect</p>
            </div>
            <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-green-400 to-cyan-400 max-w-20"></div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-green-400 to-cyan-400 rounded-xl flex items-center justify-center text-2xl text-white mb-2">
                ⚙️
              </div>
              <p className="text-green-400 font-semibold">Calibrate</p>
            </div>
            <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-green-400 to-cyan-400 max-w-20"></div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="h-16 w-16 bg-gradient-to-br from-green-400 to-cyan-400 rounded-xl flex items-center justify-center text-2xl text-white mb-2">
                🚀
              </div>
              <p className="text-green-400 font-semibold">Simulate</p>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 text-slate-400 py-16 text-center">
            <div>
              <h4 className="text-white text-xl mb-4">Role Benefits</h4>
              <p className="text-white my-2">Coaches</p>
              <p className="my-2">Sports Directors</p>
              <p className="my-2">Sport Tour readiness</p>
              <p className="text-white my-2">Optimize training for Grand Tour readiness</p>
            </div>
            <div>
              <h4 className="text-white text-xl mb-4">Nutritionists</h4>
              <p className="text-white my-2">Nutritionists</p>
              <p className="my-2">Nutritionists</p>
              <p className="my-2">Nutritionists</p>
              <p className="text-white my-2">Optimize training for Grand Tour readiness</p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="flex flex-col md:flex-row justify-between items-center px-4 md:px-12 py-8 border-t border-slate-700 text-slate-400 gap-4">
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-green-400 transition-colors">Contact</Link>
            <Link href="/security" className="hover:text-green-400 transition-colors">Security</Link>
          </div>
          <div className="flex gap-6">
            <Link href="/careers" className="hover:text-green-400 transition-colors">Careers</Link>
            <Link href="/terms" className="hover:text-green-400 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-green-400 transition-colors">Privacy</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
  );
}

            {/* Features Section */}
      <div className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Rider Digital Twin */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-green-400/50 transition-colors group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Rider Digital Twin</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Aer et intellegam duo et in, ius cu vivend ad in eimod novei hoc 
                vivendum in qui finibus deie toy Gounevidudeos.
              </p>
            </div>

            {/* Race & Tactics Simulator */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-green-400/50 transition-colors group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Race & Tactics Simulator</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                This fesurs netrus orestuue os 
                naues incepeps to si ex his ip 
                et duis Cius. Nullus uluci a tellus et.
              </p>
            </div>

            {/* Aero & Equipment Intelligence */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-green-400/50 transition-colors group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Aero & Equipment Intelligence</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Even sit amaetur dum nulen 
                his an cum volutpat ksushe in 
                hac qeue quis et ip for lorem 
                soureis.
              </p>
            </div>

            {/* Recovery & Risk Monitor */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-green-400/50 transition-colors group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Recovery & Risk Monitor</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                View E no sit nam est nulla
                incre ianpet Tha plats around 
                in quo et ipsam Unicus et.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted by Section */}
      <div className="py-16 bg-slate-800 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Trusted by */}
            <div>
              <h3 className="text-lg font-semibold text-gray-400 mb-8">Trusted by World Tour performance staff</h3>
              
              <div className="flex items-center space-x-8 mb-12">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <div className="text-white font-bold text-sm">RT</div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <div className="text-green-400 font-semibold">Connect</div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-green-400 to-cyan-400"></div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <div className="text-green-400 font-semibold">Calibrate</div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-green-400 to-cyan-400"></div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <div className="text-green-400 font-semibold">Simulate</div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-white font-semibold mb-4">How it works</h4>
                <Link
                  href="/how-it-works"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
                >
                  How it works
                </Link>
                <div className="mt-4 flex items-center space-x-4">
                  <span className="text-gray-400 text-sm">INOS</span>
                  <div className="w-8 h-6 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">UAE</span>
                  </div>
                  <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Role Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-8">Role Benefits</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-green-400 font-semibold mb-4">Coaches</h4>
                  <div className="space-y-3">
                    <div className="text-gray-300">Sports Directors</div>
                    <div className="text-gray-300">Sport Tour readiness</div>
                  </div>
                  <p className="text-gray-400 text-sm mt-4">
                    Optimize training for Grand Tour readiness
                  </p>
                </div>

                <div>
                  <h4 className="text-green-400 font-semibold mb-4">Nutritionists</h4>
                  <div className="space-y-3">
                    <div className="text-gray-300">Nutritionists</div>
                    <div className="text-gray-300">Nutritionists</div>
                  </div>
                  <p className="text-gray-400 text-sm mt-4">
                    Optimize training for Grand Tour readiness
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              A Cognitive Engine Rooted in Scientific Truth.
            </h2>
            <p className="mt-6 max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
              Cadence Labs is the definitive platform. Our AI is not a black box. It is a glass box, powered by a vast, 
              curated knowledge base of peer-reviewed literature and world-class expert consensus. We provide a single source 
              of truth that applies this scientific foundation to your athletes' datasets in an automated way, giving you a 
              complete, 360° view of performance.
            </p>
          </div>
        </div>
      </div>

      {/* Core Capabilities Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              The Science of Winning, Applied to Your Team.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Your partner team will have access to our core modules:
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    🧬
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Knowledge Base & Scientific Lineage
                  </h3>
                  <p className="mt-3 text-gray-600">
                    Automatically apply the latest referenced sports science to your data. Every model is transparent, 
                    with a visible lineage back to its source.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    🏃‍♂️
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    AI-Powered Digital Twin
                  </h3>
                  <p className="mt-3 text-gray-600">
                    Create a precise virtual replica of every athlete to model performance and predict outcomes 
                    with scientific accuracy.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    �
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    AI Race & Tactics Simulator
                  </h3>
                  <p className="mt-3 text-gray-600">
                    Simulate countless scenarios with evidence-based AI to find the optimal strategy before 
                    the race even begins.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    🚴‍♂️
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Predictive Aero & Equipment Intelligence
                  </h3>
                  <p className="mt-3 text-gray-600">
                    Model bike and rider using best-in-class data to find the fastest setup for any condition.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    ⚡
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Adaptive Recovery & Risk Monitor
                  </h3>
                  <p className="mt-3 text-gray-600">
                    Proactively predict and prevent overtraining and injury with holistic, AI-driven insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Partner Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              The First-Mover Advantage is Absolute.
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
              We are speaking with a select few teams who are ready to redefine what is possible in sports. 
              Secure your position as the first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-8 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Absolute Security</h3>
              <p className="text-gray-600">
                The entire platform is deployed on your own private cloud. Your data is your data. 
                It never leaves your control.
              </p>
            </div>

            <div className="text-center p-8 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mx-auto mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Maximum Control</h3>
              <p className="text-gray-600">
                We provide the platform and tools to automate, curate, and apply models. Your data scientists 
                can enhance and fine-tune every algorithm, ensuring your models are uniquely optimized for your team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <div>
              <h4 className="text-green-400 font-semibold mb-4">Contact</h4>
            </div>
            <div>
              <h4 className="text-green-400 font-semibold mb-4">Security</h4>
            </div>
            <div className="md:col-span-2"></div>
            <div>
              <h4 className="text-green-400 font-semibold mb-4">Careers</h4>
            </div>
            <div>
              <h4 className="text-green-400 font-semibold mb-4">Terms</h4>
            </div>
            <div>
              <h4 className="text-green-400 font-semibold mb-4">Privacy</h4>
            </div>
          </div>
          
          <div className="mt-12 flex justify-end">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded-lg"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
