import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">The Science of Victory.</span>
            <span className="block text-blue-400">Built on Evidence, Not Intuition.</span>
          </h1>
          <p className="mt-6 max-w-4xl mx-auto text-lg text-gray-300 sm:text-xl md:mt-8 md:text-2xl">
            We are building the future of elite sports performance, powered by the world's first transparent AI that applies the best sports science to your team's data.
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10 space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="rounded-md shadow">
              <Link
                href="/signup"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Request an Exclusive Demo
              </Link>
            </div>
            <div className="rounded-md shadow">
              <Link
                href="/knowledge"
                className="w-full flex items-center justify-center px-8 py-3 border border-blue-400 text-base font-medium rounded-md text-blue-400 bg-transparent hover:bg-blue-900 md:py-4 md:text-lg md:px-10"
              >
                Get the Technical Brief
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* The Problem Section */}
      <div className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Performance is Not a Secret. It's a Science.
            </h2>
            <p className="mt-6 max-w-4xl mx-auto text-lg text-gray-300 leading-relaxed">
              Your team operates at the razor's edge of human potential. Yet, the critical insights you need to win are lost. 
              Competitors offer "secret sauce" black box solutions that demand your trust without providing a reason. 
              This leaves your data scientists limited, your coaches questioning, and your team without the confidence to act.
            </p>
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

      {/* Final CTA Section */}
      <div className="bg-slate-900">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            This is an Exclusive Invitation.
          </h2>
          <p className="mt-6 text-xl text-gray-300 leading-relaxed">
            We are ready to build the future of sports performance. The only question is, are you?
          </p>
          <div className="mt-8">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Request an Exclusive Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
