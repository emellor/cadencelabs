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
          <div className="text-2xl font-bold text-white">LUTPACT</div>
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
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #0f171e 0%, #1e293b 50%, #0ea5e9 100%)'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent opacity-80"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-8">
              1Turn Raw Rider Data into <br />
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
